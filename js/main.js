/**
 * ========================================================
 * FUNLEARN - HỌC VUI MỖI NGÀY
 * Application Entry & Event Controller (main.js)
 * ES6 Module Architecture + Event Delegation + Accessibility Toolbar
 * ========================================================
 */

import * as store from './store.js';
import * as quizEngine from './quizEngine.js';
import * as renderer from './renderer.js';

let currentGradeData = null;
let pendingLessonId = null;
let sessionCorrectCount = 0;
let sessionStarsEarned = 0;
let activeAdultGateAnswer = null;
let activeReportGrade = 3;

/**
 * Open Adult Gate with random multiplication question (Mục bảo vệ phụ huynh)
 */
function openAdultGate() {
  const a = Math.floor(Math.random() * 4) + 6; // 6, 7, 8, 9
  const b = Math.floor(Math.random() * 4) + 6; // 6, 7, 8, 9
  activeAdultGateAnswer = a * b;
  renderer.renderParentalGate({ prompt: `${a} × ${b} = ?` });
}

/**
 * Verify Adult Gate answer
 */
async function verifyAdultGate() {
  const input = document.getElementById('gate-answer-input');
  const val = input ? parseInt(input.value.trim(), 10) : NaN;

  if (val === activeAdultGateAnswer) {
    renderer.closeParentalGate();
    const state = store.getState();
    await openParentPortal(state.studentGrade);
  } else {
    renderer.showParentalGateError('Kết quả chưa chính xác. Em hãy nhờ bố mẹ hoặc thầy cô giúp nhé!');
    const a = Math.floor(Math.random() * 4) + 6;
    const b = Math.floor(Math.random() * 4) + 6;
    activeAdultGateAnswer = a * b;
    const pEl = document.getElementById('gate-math-prompt');
    if (pEl) pEl.textContent = `${a} × ${b} = ?`;
    if (input) {
      input.value = '';
      input.focus();
    }
  }
}

/**
 * Open and render Parent & Teacher Portal
 * @param {number} grade
 */
async function openParentPortal(grade) {
  activeReportGrade = Number(grade) || store.getState().studentGrade;
  let targetData = currentGradeData;
  if (!targetData || targetData.grade !== activeReportGrade) {
    try {
      targetData = await store.fetchGradeData(activeReportGrade);
    } catch (err) {
      console.error('[Main] Could not fetch report grade data:', err);
    }
  }

  const reportData = store.getParentReportData(activeReportGrade, targetData);
  renderer.renderParentPortal(reportData, activeReportGrade);
}

/**
 * Re-render UI components on state change
 * @param {object} state
 * @param {string} event
 * @param {any} payload
 */
async function handleStateChange(state, event, payload) {
  // Always update header metrics & home greeting
  renderer.renderHeader(state);

  if (event === 'NAME_CHANGED') {
    return;
  }

  // If grade changed or data not loaded, fetch fresh grade data
  if (!currentGradeData || currentGradeData.grade !== state.studentGrade) {
    try {
      currentGradeData = await store.fetchGradeData(state.studentGrade);
    } catch (err) {
      console.error('[Main] Failed to load grade data:', err);
    }
  }

  // Update views based on active screen
  renderer.renderStartScreen(state.studentGrade);

  if (state.currentScreen === 'screen-subject-detail') {
    renderer.renderSubjectDetail(state, currentGradeData);
  } else if (state.currentScreen === 'screen-practice-hub') {
    renderer.renderPracticeHub(state, currentGradeData);
  } else if (state.currentScreen === 'screen-analytics') {
    renderer.renderSkills(state, currentGradeData);
  } else if (state.currentScreen === 'screen-badges') {
    renderer.renderBadges();
  }

  // Handle screen navigation
  renderer.navigateScreen(state.currentScreen);
}

/**
 * Open Step 1 Theory Summary for a lesson, or start directly if already reviewing
 * @param {string} lessonId
 */
async function openLessonStep1(lessonId) {
  const state = store.getState();
  if (!currentGradeData || currentGradeData.grade !== state.studentGrade) {
    currentGradeData = await store.fetchGradeData(state.studentGrade);
  }

  pendingLessonId = lessonId;

  // Find lesson information
  let foundLesson = null;
  if (currentGradeData && currentGradeData.subjects) {
    for (const sub of Object.values(currentGradeData.subjects)) {
      if (sub.lessons) {
        foundLesson = sub.lessons.find(l => l.id === lessonId);
        if (foundLesson) {
          foundLesson = { ...foundLesson, subjectTitle: sub.title, icon: sub.icon };
          break;
        }
      }
    }
  }

  if (foundLesson && foundLesson.summaryCard) {
    renderer.renderSummaryModal(foundLesson);
  } else {
    // If no summary card, start quiz directly
    launchQuiz(lessonId);
  }
}

/**
 * Step 2: Launch active quiz session
 * @param {string} lessonId
 */
function launchQuiz(lessonId) {
  renderer.closeSummaryModal();
  sessionCorrectCount = 0;
  sessionStarsEarned = 0;
  const session = quizEngine.startQuiz(lessonId, currentGradeData);
  renderer.renderQuestionStage(session, currentGradeData);
  store.setScreen('screen-exercise-room');
}

/**
 * Launch focused practice for a specific skill from the Skills screen
 * @param {string} skillTag
 * @param {string} fallbackLessonId
 */
async function launchSkillPractice(skillTag, fallbackLessonId) {
  const state = store.getState();
  if (!currentGradeData || currentGradeData.grade !== state.studentGrade) {
    currentGradeData = await store.fetchGradeData(state.studentGrade);
  }

  sessionCorrectCount = 0;
  sessionStarsEarned = 0;
  const session = quizEngine.startSkillPractice(skillTag || fallbackLessonId, currentGradeData);
  renderer.renderQuestionStage(session, currentGradeData);
  store.setScreen('screen-exercise-room');
}

/**
 * Handle Checking Answer in active session
 */
function handleCheckAnswer() {
  const session = quizEngine.getActiveSession();
  if (!session) return;

  const q = session.getCurrentQuestion();
  if (!q) return;

  const qType = q.type || 'choice';

  if (qType === 'input' || qType === 'fill') {
    const inputEl = document.getElementById('ex-input-field');
    const val = inputEl ? inputEl.value : '';
    session.setInput(val);
  }

  const result = session.checkAnswer();
  if (!result) return;

  // Edge cases: alert gently without penalizing attempts
  if (result.error) {
    alert(result.message);
    return;
  }

  if (result.isCorrect) {
    sessionCorrectCount += 1;
    sessionStarsEarned += result.starsEarned || 5;
  }

  renderer.renderFeedback(result, session);
}

/**
 * Handle moving to next question or ending lesson
 */
function handleNextQuestion() {
  const session = quizEngine.getActiveSession();
  if (!session) return;

  const res = session.nextQuestion();
  if (res.isDone) {
    // Lesson complete -> Show Celebration Modal with Confetti & Star Rollup!
    renderer.renderCompletionModal({
      starsEarned: sessionStarsEarned || 20,
      totalQuestions: session.getTotalCount(),
      correctCount: sessionCorrectCount
    });
  } else {
    renderer.renderQuestionStage(session, currentGradeData);
  }
}

/**
 * Setup accessibility toolbar controls listeners
 */
function setupAccessibilityControls() {
  const ttsCheckbox = document.getElementById('a11y-toggle-tts');
  const fontCheckbox = document.getElementById('a11y-toggle-font');
  const motionCheckbox = document.getElementById('a11y-toggle-motion');

  if (ttsCheckbox) {
    ttsCheckbox.addEventListener('change', () => {
      const current = renderer.getA11ySettings();
      current.ttsEnabled = ttsCheckbox.checked;
      renderer.saveA11ySettings(current);
    });
  }

  if (fontCheckbox) {
    fontCheckbox.addEventListener('change', () => {
      const current = renderer.getA11ySettings();
      current.largeFont = fontCheckbox.checked;
      renderer.saveA11ySettings(current);
    });
  }

  if (motionCheckbox) {
    motionCheckbox.addEventListener('change', () => {
      const current = renderer.getA11ySettings();
      current.reducedMotion = motionCheckbox.checked;
      renderer.saveA11ySettings(current);
    });
  }

  // Close accessibility menu when clicking outside
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('accessibility-menu');
    const btn = document.getElementById('btn-accessibility-toggle');
    if (!menu || menu.hidden) return;
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      menu.hidden = true;
      menu.classList.add('hidden');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/**
 * Global Event Delegation
 */
function setupEventDelegation() {
  document.body.addEventListener('click', async (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;

    switch (action) {
      case 'change-grade': {
        const g = Number(target.dataset.grade);
        if (g) await store.setGrade(g);
        break;
      }

      case 'login': {
        store.login();
        break;
      }

      case 'logout': {
        store.logout();
        break;
      }

      case 'navigate': {
        const screen = target.dataset.screen;
        if (screen) store.setScreen(screen);
        break;
      }

      case 'open-subject': {
        const sub = target.dataset.subject;
        if (sub) {
          store.setActiveSubject(sub);
          store.setScreen('screen-subject-detail');
        }
        break;
      }

      case 'open-practice': {
        store.setScreen('screen-practice-hub');
        break;
      }

      case 'open-skills': {
        store.setScreen('screen-analytics');
        break;
      }

      case 'open-badges': {
        store.setScreen('screen-badges');
        break;
      }

      // Step 1: Open Theory / Summary
      case 'start-lesson': {
        const lessonId = target.dataset.lessonId;
        if (lessonId) await openLessonStep1(lessonId);
        break;
      }

      // Step 2: Proceed from Theory to Practice
      case 'start-quiz-from-summary': {
        if (pendingLessonId) {
          launchQuiz(pendingLessonId);
        } else {
          renderer.closeSummaryModal();
        }
        break;
      }

      // Review Theory inside Exercise Room
      case 'open-theory': {
        const session = quizEngine.getActiveSession();
        if (session && session.lessonInfo) {
          renderer.renderSummaryModal(session.lessonInfo);
        }
        break;
      }

      case 'close-summary': {
        renderer.closeSummaryModal();
        break;
      }

      // Skill-focused retry in Analytics
      case 'review-skill': {
        const skillTag = target.dataset.skillTag;
        const lessonId = target.dataset.lessonId;
        await launchSkillPractice(skillTag, lessonId);
        break;
      }

      case 'select-choice': {
        const session = quizEngine.getActiveSession();
        if (session && !session.isAnswered) {
          session.selectChoice(target.dataset.id);
          renderer.highlightSelectedChoice(target);
        }
        break;
      }

      case 'check-answer': {
        handleCheckAnswer();
        break;
      }

      case 'next-question': {
        handleNextQuestion();
        break;
      }

      // Accessibility Toolbar toggle
      case 'toggle-accessibility-menu': {
        renderer.toggleA11yMenu();
        break;
      }

      // TTS: Read prompt aloud
      case 'speak-prompt': {
        const session = quizEngine.getActiveSession();
        if (session) {
          const q = session.getCurrentQuestion();
          if (q) renderer.speakPrompt(q.prompt, session.lessonId);
        }
        break;
      }

      // Finish completion modal
      case 'finish-completion-to-skills': {
        renderer.closeCompletionModal();
        store.setScreen('screen-analytics');
        break;
      }

      case 'finish-completion-to-home': {
        renderer.closeCompletionModal();
        store.setScreen('screen-home');
        break;
      }

      // ========================================================
      // GÓC PHỤ HUYNH & GIÁO VIÊN CONTROLLERS
      // ========================================================
      case 'open-parent-gate': {
        openAdultGate();
        break;
      }

      case 'verify-parent-gate': {
        await verifyAdultGate();
        break;
      }

      case 'close-parent-gate': {
        renderer.closeParentalGate();
        break;
      }

      case 'close-parent-portal': {
        renderer.closeParentPortal();
        break;
      }

      case 'change-report-grade': {
        const g = Number(target.dataset.grade);
        if (g) await openParentPortal(g);
        break;
      }

      case 'print-parent-report': {
        window.print();
        break;
      }

      case 'toggle-custom-json-panel': {
        renderer.toggleCustomJsonPanel();
        break;
      }

      case 'trigger-json-file': {
        const fileInput = document.getElementById('custom-json-file-input');
        if (fileInput) fileInput.click();
        break;
      }

      case 'submit-custom-json': {
        const textarea = document.getElementById('custom-json-textarea');
        const text = textarea ? textarea.value.trim() : '';
        if (!text) {
          renderer.renderCustomJsonFeedback({ success: false, message: 'Vui lòng dán hoặc chọn tệp JSON câu hỏi!' });
          return;
        }

        const res = store.importCustomQuizJSON(activeReportGrade, text);
        renderer.renderCustomJsonFeedback(res);
        if (res.success) {
          await openParentPortal(activeReportGrade);
        }
        break;
      }

      case 'reset-progress': {
        const confirmed = window.confirm('Thao tác này sẽ đặt lại toàn bộ điểm sao, chuỗi ngày và lịch sử làm bài về trạng thái ban đầu. Bạn có chắc chắn muốn đặt lại không?');
        if (confirmed) {
          store.resetAllProgress();
          await openParentPortal(activeReportGrade);
          alert('Đã đặt lại dữ liệu học tập thành công!');
        }
        break;
      }

      default:
        break;
    }
  });

  // Enter key support for input question & adult gate
  document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const activeInput = document.getElementById('ex-input-field');
      if (activeInput && document.activeElement === activeInput) {
        e.preventDefault();
        handleCheckAnswer();
        return;
      }

      const gateInput = document.getElementById('gate-answer-input');
      if (gateInput && document.activeElement === gateInput) {
        e.preventDefault();
        verifyAdultGate();
        return;
      }
    }
  });

  // File Upload Reader for custom questions
  const fileInput = document.getElementById('custom-json-file-input');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (evt) => {
        const textarea = document.getElementById('custom-json-textarea');
        if (textarea) textarea.value = evt.target.result;
      };
      reader.readAsText(file);
    });
  }

  // Redraw Bezier Curves on window resize with debounce
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const session = quizEngine.getActiveSession();
      if (session) renderer.redrawMatchCurves(session);
    }, 120);
  });
}

/**
 * Setup student name input listener in top header
 */
function setupStudentNameInput() {
  const nameInput = document.getElementById('header-student-name-input');
  if (!nameInput) return;

  let isComposing = false;
  nameInput.addEventListener('compositionstart', () => {
    isComposing = true;
  });
  nameInput.addEventListener('compositionend', () => {
    isComposing = false;
    store.setStudentName(nameInput.value);
  });
  nameInput.addEventListener('input', () => {
    if (!isComposing) {
      store.setStudentName(nameInput.value);
    }
  });
  nameInput.addEventListener('change', () => {
    store.setStudentName(nameInput.value);
  });
  nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      store.setStudentName(nameInput.value);
      nameInput.blur();
    }
  });
}

/**
 * Initialize application on DOM ready
 */
async function initApp() {
  // Register state subscriber
  store.subscribe(handleStateChange);

  // Setup Event Delegation, Accessibility Toolbar & Name Input
  setupEventDelegation();
  setupAccessibilityControls();
  setupStudentNameInput();

  // Apply saved accessibility preferences
  renderer.applyA11ySettings();

  // Update Login Streak
  store.updateStreak();

  // Fetch initial grade data
  const initialState = store.getState();
  try {
    currentGradeData = await store.fetchGradeData(initialState.studentGrade);
  } catch (err) {
    console.error('[Main] Could not pre-fetch grade data:', err);
  }

  // Initial render
  renderer.renderHeader(initialState);
  renderer.renderStartScreen(initialState.studentGrade);
  renderer.navigateScreen(initialState.currentScreen);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
