/**
 * ========================================================
 * FUNLEARN - HỌC VUI MỖI NGÀY
 * Interactive Assessment Engine (quizEngine.js)
 * Tuân thủ:
 * - Nielsen Heuristics: Chống soft-lock, phản hồi sư phạm 3 tầng
 * - Mayer & Fiorella: Giảm tải nhận thức, phản hồi tức thì
 * - 4 Dạng bài: mcq (choice), fill (input), match (ghép đôi), tf (đúng/sai)
 * - Xử lý trường hợp biên: khoảng trắng, dấu phẩy thập phân, hủy chọn ghép đôi
 * ========================================================
 */

import { addStars, recordAnswer, markLessonCompleted } from './store.js';

/**
 * Normalize text/numeric answer for fair, robust comparison
 * Handles: decimals (3,5 vs 3.5), thousand spaces (1 000 vs 1000), fractions (1 / 2 vs 1/2)
 * @param {string|number} raw
 * @returns {string}
 */
export function normalizeInputAnswer(raw) {
  if (raw === null || raw === undefined) return '';
  let str = String(raw).trim().toLowerCase();

  // Replace multiple spaces with a single space
  str = str.replace(/\s+/g, ' ');

  // Normalize fractions spacing: '1 / 2' -> '1/2'
  str = str.replace(/\s*\/\s*/g, '/');

  // Replace comma with dot for decimal numbers if surrounded by digits: '3,5' -> '3.5'
  str = str.replace(/(\d+),(\d+)/g, '$1.$2');

  // Remove space between digits (Vietnamese thousand separator, e.g. '1 000' -> '1000')
  str = str.replace(/(\d+)\s+(\d+)/g, '$1$2');

  return str;
}

class QuizSession {
  constructor(lessonId, lessonInfo, questions, skillTag = '') {
    this.lessonId = lessonId;
    this.lessonInfo = lessonInfo || {};
    this.questions = Array.isArray(questions) ? questions : [];
    this.skillTag = skillTag || lessonInfo.skillTag || '';
    this.currentIndex = 0;
    this.attempts = 0;
    this.selectedChoice = null;
    this.inputValue = '';
    this.matchedPairs = {}; // { leftId: rightId }
    this.activeMatchLeft = null; // currently selected left item in match
    this.disabledOptions = new Set(); // wrong options dimmed in Tier 1
    this.isAnswered = false;
    this.isRevealed = false;
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex] || null;
  }

  getTotalCount() {
    return this.questions.length;
  }

  isLastQuestion() {
    return this.currentIndex >= this.questions.length - 1;
  }

  resetCurrentState() {
    this.attempts = 0;
    this.selectedChoice = null;
    this.inputValue = '';
    this.matchedPairs = {};
    this.activeMatchLeft = null;
    this.disabledOptions.clear();
    this.isAnswered = false;
    this.isRevealed = false;
  }

  selectChoice(choiceId) {
    if (this.isAnswered || this.isRevealed) return;
    this.selectedChoice = choiceId;
  }

  setInput(val) {
    if (this.isAnswered || this.isRevealed) return;
    this.inputValue = val;
  }

  /**
   * Toggle match left selection (allows deselecting if clicked again)
   * @param {string} leftId
   * @returns {boolean} Whether item is now selected
   */
  toggleMatchLeft(leftId) {
    if (this.isAnswered || this.isRevealed) return false;
    if (this.activeMatchLeft === leftId) {
      this.activeMatchLeft = null;
      return false;
    } else {
      this.activeMatchLeft = leftId;
      return true;
    }
  }

  /**
   * Unpair a matched item in match interaction
   * @param {string} rightId
   */
  unpairMatch(rightId) {
    if (this.isAnswered || this.isRevealed) return;
    for (const [lId, rId] of Object.entries(this.matchedPairs)) {
      if (rId === rightId) {
        delete this.matchedPairs[lId];
        break;
      }
    }
  }

  setMatch(leftId, rightId) {
    if (this.isAnswered || this.isRevealed) return;
    // Remove any previous pairing with this rightId
    this.unpairMatch(rightId);
    this.matchedPairs[leftId] = rightId;
    this.activeMatchLeft = null;
  }

  /**
   * Get shuffled right column pairs for matching questions
   * Guarantees derangement so items in Column B never appear in the same row as Column A!
   * @param {object} q
   * @returns {Array}
   */
  getShuffledRightPairs(q) {
    if (!this.shuffledRightMap) {
      this.shuffledRightMap = new Map();
    }
    const qKey = q.id || `q_${this.currentIndex}`;
    if (this.shuffledRightMap.has(qKey)) {
      return this.shuffledRightMap.get(qKey);
    }

    const pairs = Array.isArray(q.pairs) ? [...q.pairs] : [];
    if (pairs.length <= 1) {
      this.shuffledRightMap.set(qKey, pairs);
      return pairs;
    }

    let shuffled = [...pairs];
    let isDeranged = false;
    let attempts = 0;

    while (!isDeranged && attempts < 30) {
      // Fisher-Yates shuffle
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      // Derangement check: zero elements in the same row
      const sameRowMatches = shuffled.filter((p, idx) => p.id === pairs[idx].id).length;
      if (sameRowMatches === 0) {
        isDeranged = true;
      }
      attempts++;
    }

    // Deterministic derangement fallback: shift by 1 position if random didn't achieve 0 straight matches
    if (!isDeranged) {
      shuffled = pairs.slice(1).concat(pairs.slice(0, 1));
    }

    this.shuffledRightMap.set(qKey, shuffled);
    return shuffled;
  }

  /**
   * Check answer with 3-tier feedback & edge case validation
   * @returns {object}
   */
  checkAnswer() {
    const q = this.getCurrentQuestion();
    if (!q) return null;

    const qType = q.type || 'choice';

    // Edge Case 1: Validate input existence without penalty
    if (qType === 'choice' || qType === 'mcq' || qType === 'true_false' || qType === 'tf') {
      if (!this.selectedChoice) {
        return {
          error: 'NOT_SELECTED',
          message: 'Em hãy chọn một đáp án trước khi bấm Kiểm tra nhé!'
        };
      }
    } else if (qType === 'input' || qType === 'fill') {
      const trimmed = (this.inputValue || '').trim();
      if (!trimmed) {
        return {
          error: 'NOT_ENTERED',
          message: 'Em hãy điền câu trả lời vào ô trống trước nhé!'
        };
      }
    } else if (qType === 'match') {
      const pairCount = Array.isArray(q.pairs) ? q.pairs.length : 0;
      const matchedCount = Object.keys(this.matchedPairs).length;
      if (matchedCount < pairCount) {
        return {
          error: 'INCOMPLETE_MATCH',
          message: `Em hãy ghép nối đủ tất cả ${pairCount} cặp tương ứng trước khi kiểm tra nhé!`
        };
      }
    }

    // Answer evaluation
    let isCorrect = false;

    if (qType === 'choice' || qType === 'mcq' || qType === 'true_false' || qType === 'tf') {
      isCorrect = String(this.selectedChoice).trim().toUpperCase() === String(q.correct).trim().toUpperCase();
    } else if (qType === 'input' || qType === 'fill') {
      const userNorm = normalizeInputAnswer(this.inputValue);
      const correctNorm = normalizeInputAnswer(q.correct);
      isCorrect = userNorm === correctNorm;

      // Additional numeric equivalence fallback (e.g. 3.50 === 3.5)
      if (!isCorrect && !isNaN(Number(userNorm)) && !isNaN(Number(correctNorm))) {
        isCorrect = Number(userNorm) === Number(correctNorm);
      }
    } else if (qType === 'match') {
      const pairMap = new Map((q.pairs || []).map(p => [p.id, p]));
      isCorrect = Object.entries(this.matchedPairs).every(([leftId, rightId]) => {
        if (leftId === rightId) return true;
        const expected = pairMap.get(leftId);
        const chosen = pairMap.get(rightId);
        return expected && chosen && expected.right === chosen.right;
      });
    }

    this.attempts += 1;
    const firstTry = this.attempts === 1;
    const currentSkill = q.skillTag || this.skillTag || '';

    // Determine subject key
    let subjectKey = 'toan';
    if (this.lessonId.startsWith('tv-') || this.lessonId.includes('tieng-viet')) {
      subjectKey = 'tieng-viet';
    } else if (this.lessonId.startsWith('eng-') || this.lessonId.includes('tieng-anh')) {
      subjectKey = 'tieng-anh';
    }

    if (isCorrect) {
      this.isAnswered = true;
      const starsEarned = firstTry ? 10 : 5;
      addStars(starsEarned);
      recordAnswer({ subjectKey, skillTag: currentSkill, isCorrect: true, firstTry });

      return {
        isCorrect: true,
        firstTry,
        attempts: this.attempts,
        starsEarned,
        message: firstTry
          ? 'Tuyệt vời! Em đã trả lời rất chính xác ngay lần đầu! 🌟 (+10 ⭐)'
          : 'Rất đáng khen! Em đã kiên trì tìm ra đáp án đúng! 👏 (+5 ⭐)',
        correctAnswer: q.correct,
        hint: q.hint
      };
    } else {
      recordAnswer({ subjectKey, skillTag: currentSkill, isCorrect: false, firstTry: false });

      // Mark the wrongly selected option for visual fading in Tier 1
      if (this.selectedChoice) {
        this.disabledOptions.add(this.selectedChoice);
      }

      const tier = this.attempts;
      const allowSkip = tier >= 3; // Tier 3 unlocks next question & step-by-step solution

      let message = 'Chưa chính xác rồi, em hãy thử tính lại nhé! 💪';
      if (tier === 2) {
        message = 'Gợi ý phương pháp đã sẵn sàng, em hãy đọc gợi ý để làm lại nhé! 💡';
      } else if (tier >= 3) {
        message = 'Em hãy xem hướng dẫn giải chi tiết bên dưới để rút kinh nghiệm và bấm "Câu tiếp theo" nhé! 🌟';
      }

      return {
        isCorrect: false,
        firstTry: false,
        attempts: this.attempts,
        tier,
        wrongChoice: this.selectedChoice,
        showHint: tier >= 2,
        allowSkip,
        message,
        hint: q.hint || 'Em hãy đọc kĩ đề bài và tính toán cẩn thận.',
        correctAnswer: allowSkip ? q.correct : null
      };
    }
  }

  /**
   * Safe step-by-step reveal to prevent soft-locks
   */
  revealAnswer() {
    const q = this.getCurrentQuestion();
    if (!q) return null;

    this.isRevealed = true;
    this.isAnswered = true;

    return {
      isRevealed: true,
      correctAnswer: q.correct,
      hint: q.hint || 'Em hãy đọc kĩ phương pháp làm bài nhé!'
    };
  }

  nextQuestion() {
    if (this.isLastQuestion()) {
      markLessonCompleted(this.lessonId);
      return { isDone: true, lessonId: this.lessonId };
    }
    this.currentIndex += 1;
    this.resetCurrentState();
    return { isDone: false, question: this.getCurrentQuestion(), index: this.currentIndex };
  }
}

let activeSession = null;

/**
 * Initialize a new quiz session for a lesson
 * @param {string} lessonId
 * @param {object} gradeData
 * @returns {QuizSession}
 */
export function startQuiz(lessonId, gradeData) {
  let questions = [];
  let lessonInfo = { id: lessonId, title: 'Bài Luyện Tập' };

  if (gradeData && gradeData.subjects) {
    for (const sub of Object.values(gradeData.subjects)) {
      if (sub.lessons) {
        const found = sub.lessons.find(l => l.id === lessonId);
        if (found) {
          lessonInfo = {
            ...found,
            subjectTitle: sub.title,
            subjectKey: sub.key,
            icon: sub.icon,
            summaryCard: found.summaryCard
          };
          if (found.questions && found.questions.length > 0) {
            questions = found.questions;
          }
          break;
        }
      }
    }
  }

  if (questions.length === 0 && gradeData && gradeData.questionBank && gradeData.questionBank[lessonId]) {
    questions = gradeData.questionBank[lessonId];
  }

  // Fallback safe questions
  if (questions.length === 0 && gradeData && gradeData.questionBank) {
    const firstKey = Object.keys(gradeData.questionBank)[0];
    if (firstKey) questions = gradeData.questionBank[firstKey];
  }

  activeSession = new QuizSession(lessonId, lessonInfo, questions, lessonInfo.skillTag || '');
  return activeSession;
}

/**
 * Initialize a custom quiz session filtered by skillTag
 * @param {string} skillTag
 * @param {object} gradeData
 * @returns {QuizSession}
 */
export function startSkillPractice(skillTag, gradeData) {
  let filteredQuestions = [];
  let lessonInfo = {
    id: `skill-${skillTag}`,
    title: `Luyện tập chuyên đề`,
    skillTag
  };

  if (gradeData && gradeData.subjects) {
    for (const sub of Object.values(gradeData.subjects)) {
      if (sub.lessons) {
        for (const les of sub.lessons) {
          if (les.skillTag === skillTag || (les.questions && les.questions.some(q => q.skillTag === skillTag))) {
            lessonInfo.subjectTitle = sub.title;
            lessonInfo.icon = sub.icon;
            lessonInfo.title = `Chuyên đề: ${les.lessonTitle || les.title}`;
            lessonInfo.summaryCard = les.summaryCard;
            const qList = les.questions || gradeData.questionBank[les.id] || [];
            filteredQuestions.push(...qList);
          }
        }
      }
    }
  }

  if (filteredQuestions.length === 0) {
    // If not found by tag, fallback to start standard quiz
    return startQuiz(skillTag, gradeData);
  }

  activeSession = new QuizSession(`skill-${skillTag}`, lessonInfo, filteredQuestions, skillTag);
  return activeSession;
}

/**
 * Get active session
 * @returns {QuizSession|null}
 */
export function getActiveSession() {
  return activeSession;
}
