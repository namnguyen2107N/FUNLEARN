/**
 * ========================================================
 * FUNLEARN - HỌC VUI MỖI NGÀY
 * Central Store & State Management (store.js)
 * Single Source of Truth + Reactive Subscriptions + localStorage
 * Tích hợp theo dõi Kỹ Năng (skillStats) & SGK Kết nối tri thức
 * Tích hợp Báo cáo Phụ huynh & Quản lý đề bài tùy chỉnh
 * ========================================================
 */

const STORAGE_KEY = 'funlearn_app_state_v3';
const CUSTOM_DATA_KEY = 'funlearn_custom_curriculum_v1';

// In-memory cache for lazy-loaded grade JSON data
const gradeDataCache = new Map();

/**
 * Lazy load and cache grade data from JSON (hỗ trợ GitHub Pages relative paths)
 * @param {number} grade
 * @returns {Promise<object>}
 */
export async function fetchGradeData(grade) {
  const g = Number(grade) || 3;
  if (gradeDataCache.has(g)) {
    return gradeDataCache.get(g);
  }

  try {
    // Relative path safe for both root '/' and GitHub Pages subfolder '/Learnchill/'
    const response = await fetch(`./data/grade${g}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load data/grade${g}.json: ${response.statusText}`);
    }
    const data = await response.json();

    // Merge any custom imported questions saved in localStorage
    mergeCustomDataIntoGrade(g, data);

    gradeDataCache.set(g, data);
    return data;
  } catch (err) {
    console.error(`[Store] Error loading grade ${g} data:`, err);
    throw err;
  }
}

/**
 * Merge user-imported custom questions into loaded grade data
 * @param {number} grade
 * @param {object} gradeData
 */
function mergeCustomDataIntoGrade(grade, gradeData) {
  try {
    const raw = localStorage.getItem(`${CUSTOM_DATA_KEY}_g${grade}`);
    if (!raw) return;
    const custom = JSON.parse(raw);

    // Merge custom lessons into subjects
    if (custom.lessons && Array.isArray(custom.lessons)) {
      custom.lessons.forEach(cLes => {
        const subjKey = cLes.subjectKey || 'toan';
        if (gradeData.subjects && gradeData.subjects[subjKey]) {
          const exists = gradeData.subjects[subjKey].lessons.some(l => l.id === cLes.id);
          if (!exists) {
            gradeData.subjects[subjKey].lessons.push(cLes);
          }
        }
        if (cLes.questions) {
          gradeData.questionBank[cLes.id] = cLes.questions;
        }
      });
    }

    // Merge custom question bank
    if (custom.questionBank) {
      Object.assign(gradeData.questionBank, custom.questionBank);
    }
  } catch (e) {
    console.warn('[Store] Could not merge custom curriculum data:', e);
  }
}

// Initial state definition
function createInitialState() {
  return {
    isLoggedIn: false,
    studentGrade: 3,
    studentName: 'Khối Lớp 3',
    studentAvatar: '🌱',
    stars: 0,
    streakDays: 1,
    lastVisitDate: new Date().toISOString().slice(0, 10),
    currentScreen: 'screen-start',
    activeSubject: 'toan',
    completedLessons: [],
    skillsStats: {}, // { [skillTag]: { correct: number, total: number, attempts: number } }
    history: {
      totalAnswered: 0,
      totalCorrect: 0,
      firstTryCorrect: 0,
      bySubject: {
        toan: { correct: 0, total: 0 },
        'tieng-viet': { correct: 0, total: 0 },
        'tieng-anh': { correct: 0, total: 0 }
      }
    }
  };
}

// Load persisted state from localStorage
function loadPersistedState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return createInitialState();
    const parsed = JSON.parse(saved);
    const initial = createInitialState();
    return {
      ...initial,
      ...parsed,
      skillsStats: {
        ...(initial.skillsStats || {}),
        ...(parsed.skillsStats || {})
      },
      history: {
        ...initial.history,
        ...(parsed.history || {})
      }
    };
  } catch (e) {
    console.warn('[Store] Could not read localStorage, fallback to initial state', e);
    return createInitialState();
  }
}

// Save state to localStorage
function saveStateToStorage(state) {
  try {
    const toSave = {
      isLoggedIn: state.isLoggedIn,
      studentGrade: state.studentGrade,
      studentName: state.studentName,
      studentAvatar: state.studentAvatar,
      stars: state.stars,
      streakDays: state.streakDays,
      lastVisitDate: state.lastVisitDate,
      completedLessons: state.completedLessons,
      skillsStats: state.skillsStats,
      history: state.history
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (e) {
    console.warn('[Store] Failed to persist state to localStorage', e);
  }
}

// Internal State & Subscribers
let state = loadPersistedState();
const listeners = new Set();

/**
 * Subscribe to state changes
 * @param {Function} listener
 * @returns {Function} Unsubscribe function
 */
export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/**
 * Notify all listeners of a state change
 * @param {string} event
 * @param {any} payload
 */
function notify(event, payload = {}) {
  saveStateToStorage(state);
  for (const listener of listeners) {
    try {
      listener(state, event, payload);
    } catch (err) {
      console.error('[Store] Error in listener callback:', err);
    }
  }
}

/**
 * Get a read-only snapshot of the current state
 * @returns {object}
 */
export function getState() {
  return { ...state };
}

/**
 * Check and update login streak based on calendar date
 */
export function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const lastDate = state.lastVisitDate;

  if (lastDate !== today) {
    const prev = new Date(lastDate);
    const curr = new Date(today);
    const diffDays = Math.round((curr - prev) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      state.streakDays += 1;
    } else if (diffDays > 1) {
      state.streakDays = 1;
    }
    state.lastVisitDate = today;
    notify('STREAK_UPDATED', { streakDays: state.streakDays });
  }
}

/**
 * Select/change student grade (Grade 3, 4, 5)
 * @param {number} gradeNum
 */
export async function setGrade(gradeNum) {
  const g = Number(gradeNum);
  if (![3, 4, 5].includes(g)) return;

  state.studentGrade = g;
  state.studentName = `Khối Lớp ${g}`;
  state.studentAvatar = g === 3 ? '🌱' : (g === 4 ? '🌿' : '🌟');

  // Ensure data is cached
  await fetchGradeData(g);

  notify('GRADE_CHANGED', { grade: g });
}

export function login() {
  state.isLoggedIn = true;
  state.currentScreen = 'screen-home';
  notify('AUTH_LOGIN');
}

export function logout() {
  state.isLoggedIn = false;
  state.currentScreen = 'screen-start';
  notify('AUTH_LOGOUT');
}

export function setScreen(screenId) {
  state.currentScreen = screenId;
  notify('SCREEN_CHANGED', { screenId });
}

export function setActiveSubject(subjectKey) {
  state.activeSubject = subjectKey;
  notify('SUBJECT_CHANGED', { subjectKey });
}

export function addStars(amount) {
  state.stars = Math.max(0, state.stars + amount);
  notify('STARS_UPDATED', { stars: state.stars, added: amount });
}

/**
 * Record answer attempt and update skill stats
 * @param {object} param0
 */
export function recordAnswer({ subjectKey, skillTag, isCorrect, firstTry }) {
  state.history.totalAnswered += 1;

  if (isCorrect) {
    state.history.totalCorrect += 1;
    if (firstTry) {
      state.history.firstTryCorrect += 1;
    }
    if (subjectKey && state.history.bySubject[subjectKey]) {
      state.history.bySubject[subjectKey].correct += 1;
    }
  }

  if (subjectKey && state.history.bySubject[subjectKey]) {
    state.history.bySubject[subjectKey].total += 1;
  }

  // Update skill-specific metrics
  if (skillTag) {
    if (!state.skillsStats[skillTag]) {
      state.skillsStats[skillTag] = { correct: 0, total: 0, attempts: 0 };
    }
    state.skillsStats[skillTag].total += 1;
    state.skillsStats[skillTag].attempts += 1;
    if (isCorrect) {
      state.skillsStats[skillTag].correct += 1;
    }
  }

  notify('ANSWER_RECORDED', { isCorrect, firstTry, skillTag });
}

/**
 * Mark a lesson as completed
 * @param {string} lessonId
 */
export function markLessonCompleted(lessonId) {
  if (!state.completedLessons.includes(lessonId)) {
    state.completedLessons.push(lessonId);
    notify('LESSON_COMPLETED', { lessonId });
  }
}

/**
 * Compute the 4 badge statuses based on real student metrics
 * @returns {Array<object>}
 */
export function getBadgesStatus() {
  const starsCount = state.stars;
  const completedCount = state.completedLessons.length;
  const firstTryCount = state.history.firstTryCorrect;

  const hasCompletedTV = state.completedLessons.some(id => id.startsWith('tv-'));
  const hasCompletedEng = state.completedLessons.some(id => id.startsWith('eng-'));
  const readerCount = (hasCompletedTV ? 1 : 0) + (hasCompletedEng ? 1 : 0);

  return [
    {
      id: 'badge-star',
      name: 'Ngôi Sao',
      icon: '⭐',
      target: 30,
      current: Math.min(starsCount, 30),
      isUnlocked: starsCount >= 30,
      conditionText: 'Tích lũy 30 ⭐ học tập',
      progressText: `${Math.min(starsCount, 30)}/30 ⭐`
    },
    {
      id: 'badge-warrior',
      name: 'Chiến Binh',
      icon: '🛡️',
      target: 3,
      current: Math.min(completedCount, 3),
      isUnlocked: completedCount >= 3,
      conditionText: 'Hoàn thành 3 bài học',
      progressText: `${Math.min(completedCount, 3)}/3 bài`
    },
    {
      id: 'badge-thinker',
      name: 'Nhà Tư Duy',
      icon: '🧠',
      target: 5,
      current: Math.min(firstTryCount, 5),
      isUnlocked: firstTryCount >= 5,
      conditionText: 'Đúng ngay lần đầu 5 câu',
      progressText: `${Math.min(firstTryCount, 5)}/5 câu`
    },
    {
      id: 'badge-reader',
      name: 'Bạn Đọc Chăm',
      icon: '📚',
      target: 2,
      current: readerCount,
      isUnlocked: readerCount >= 2,
      conditionText: 'Học 1 bài Tiếng Việt & 1 bài Tiếng Anh',
      progressText: `${readerCount}/2 môn`
    }
  ];
}

/**
 * Get dynamic Skills Analysis for the current grade
 * Merges curriculum defaults with real student performance
 * @param {number} grade
 * @param {object} gradeData
 * @returns {object} { mastered: Array, needsReview: Array }
 */
export function getSkillsAnalysis(grade, gradeData) {
  if (!gradeData || !gradeData.skills) {
    return { mastered: [], needsReview: [] };
  }

  const defaultMastered = gradeData.skills.mastered || [];
  const defaultNeedsReview = gradeData.skills.needsReview || [];

  const enrichedNeedsReview = defaultNeedsReview.map(item => {
    const stats = state.skillsStats[item.skillTag];
    let accuracy = null;
    if (stats && stats.total > 0) {
      accuracy = Math.round((stats.correct / stats.total) * 100);
    }
    return {
      ...item,
      accuracy,
      attempts: stats ? stats.attempts : 0
    };
  });

  return {
    mastered: defaultMastered,
    needsReview: enrichedNeedsReview
  };
}

/**
 * Compile detailed Parent & Teacher Progress Report
 * @param {number} grade
 * @param {object} gradeData
 * @returns {object}
 */
export function getParentReportData(grade, gradeData) {
  const g = Number(grade) || state.studentGrade;
  const history = state.history;
  const total = history.totalAnswered || 0;
  const correct = history.totalCorrect || 0;
  const firstTry = history.firstTryCorrect || 0;

  const firstTryRate = correct > 0 ? Math.round((firstTry / correct) * 100) : 0;
  const overallRate = total > 0 ? Math.round((correct / total) * 100) : 0;

  const analysis = getSkillsAnalysis(g, gradeData);

  return {
    studentName: state.studentName,
    grade: g,
    reportDate: new Date().toLocaleDateString('vi-VN', { year: 'numeric', month: 'long', day: 'numeric' }),
    stars: state.stars,
    streakDays: state.streakDays,
    totalAnswered: total,
    totalCorrect: correct,
    firstTryCorrect: firstTry,
    firstTryRate,
    overallRate,
    bySubject: {
      toan: { ...history.bySubject.toan, rate: history.bySubject.toan.total > 0 ? Math.round((history.bySubject.toan.correct / history.bySubject.toan.total) * 100) : 0 },
      'tieng-viet': { ...history.bySubject['tieng-viet'], rate: history.bySubject['tieng-viet'].total > 0 ? Math.round((history.bySubject['tieng-viet'].correct / history.bySubject['tieng-viet'].total) * 100) : 0 },
      'tieng-anh': { ...history.bySubject['tieng-anh'], rate: history.bySubject['tieng-anh'].total > 0 ? Math.round((history.bySubject['tieng-anh'].correct / history.bySubject['tieng-anh'].total) * 100) : 0 }
    },
    masteredSkills: analysis.mastered,
    needsReviewSkills: analysis.needsReview
  };
}

/**
 * Import custom JSON curriculum / questions for teachers
 * @param {number} grade
 * @param {string|object} jsonInput
 * @returns {object} { success: boolean, message: string, importedCount: number }
 */
export function importCustomQuizJSON(grade, jsonInput) {
  const g = Number(grade) || state.studentGrade;
  let parsed = null;

  try {
    parsed = typeof jsonInput === 'string' ? JSON.parse(jsonInput) : jsonInput;
  } catch (err) {
    return { success: false, message: 'Định dạng JSON không hợp lệ! Vui lòng kiểm tra lại cú pháp.', importedCount: 0 };
  }

  if (!parsed || typeof parsed !== 'object') {
    return { success: false, message: 'Dữ liệu JSON rỗng hoặc không đúng chuẩn Object!', importedCount: 0 };
  }

  let count = 0;
  const existingGradeData = gradeDataCache.get(g);

  // Schema 1: Full curriculum or questions array
  if (Array.isArray(parsed.questions)) {
    const customId = `custom-les-${Date.now()}`;
    const newLesson = {
      id: customId,
      code: 'Tùy chỉnh',
      title: parsed.title || 'Bài tập mở rộng giáo viên giao',
      lessonTitle: parsed.title || 'Bài tập mở rộng giáo viên giao',
      skillTag: parsed.skillTag || `custom-g${g}`,
      status: 'ready',
      summaryCard: parsed.summaryCard || {
        title: 'Ghi nhớ bài học',
        keyPoints: ['Đọc kĩ yêu cầu đề bài.', 'Vận dụng kiến thức để giải.'],
        example: 'Ví dụ bài tập giáo viên giao.'
      },
      questions: parsed.questions
    };

    if (existingGradeData) {
      existingGradeData.subjects.toan.lessons.unshift(newLesson);
      existingGradeData.questionBank[customId] = parsed.questions;
    }

    // Save to custom storage
    saveCustomToStorage(g, { lessons: [newLesson] });
    count = parsed.questions.length;

  } else if (parsed.questionBank) {
    if (existingGradeData) {
      Object.assign(existingGradeData.questionBank, parsed.questionBank);
    }
    saveCustomToStorage(g, { questionBank: parsed.questionBank });
    count = Object.values(parsed.questionBank).reduce((acc, q) => acc + (Array.isArray(q) ? q.length : 0), 0);
  } else {
    return { success: false, message: 'Không tìm thấy mảng "questions" hoặc đối tượng "questionBank" trong tệp JSON!', importedCount: 0 };
  }

  notify('CUSTOM_JSON_IMPORTED', { grade: g, count });
  return { success: true, message: `Nhập thành công ${count} câu hỏi vào Khối Lớp ${g}!`, importedCount: count };
}

function saveCustomToStorage(grade, data) {
  try {
    const key = `${CUSTOM_DATA_KEY}_g${grade}`;
    const existing = JSON.parse(localStorage.getItem(key) || '{"lessons":[],"questionBank":{}}');
    if (data.lessons) existing.lessons.push(...data.lessons);
    if (data.questionBank) Object.assign(existing.questionBank, data.questionBank);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (e) {
    console.warn('[Store] Could not save custom JSON to localStorage:', e);
  }
}

/**
 * Reset all student progress to default initial state
 */
export function resetAllProgress() {
  localStorage.removeItem(STORAGE_KEY);
  state = createInitialState();
  notify('PROGRESS_RESET');
}
