/**
 * ========================================================
 * FUNLEARN - HỌC VUI MỖI NGÀY
 * Safe UI Renderer & Sensory-Friendly Animations (renderer.js)
 * Tuân thủ:
 * - 60fps GPU properties: transform, opacity, stroke-dashoffset
 * - Mascot chú cú SVG 3 trạng thái (idle, happy, hint)
 * - Tap-to-Match dây nối Bezier Curve SVG
 * - Phản hồi thưởng: Flying Star (Web Animations API) & Canvas Confetti (1.8s)
 * - Trợ năng UDL 3.0: TTS, Cỡ chữ lớn, Giảm chuyển động
 * ========================================================
 */

import { getBadgesStatus, getSkillsAnalysis } from './store.js';

const SCREENS = [
  'screen-start',
  'screen-home',
  'screen-subject-detail',
  'screen-practice-hub',
  'screen-exercise-room',
  'screen-analytics',
  'screen-badges'
];

const A11Y_STORAGE_KEY = 'funlearn_a11y_settings_v1';

/**
 * Get persisted accessibility settings
 * @returns {object}
 */
export function getA11ySettings() {
  try {
    const saved = localStorage.getItem(A11Y_STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('[A11y] Could not read localStorage:', e);
  }
  return {
    ttsEnabled: true,
    largeFont: false,
    reducedMotion: false
  };
}

/**
 * Save accessibility settings and apply styles
 * @param {object} settings
 */
export function saveA11ySettings(settings) {
  try {
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(settings));
  } catch (e) {
    console.warn('[A11y] Could not save localStorage:', e);
  }
  applyA11ySettings();
}

/**
 * Apply accessibility classes & state to DOM
 */
export function applyA11ySettings() {
  const settings = getA11ySettings();

  // 1. Large Font mode
  document.body.classList.toggle('text-large', Boolean(settings.largeFont));

  // 2. Reduced Motion mode
  document.body.classList.toggle('reduce-motion', Boolean(settings.reducedMotion));

  // 3. TTS Prompt Button Visibility
  const ttsBtn = document.getElementById('btn-tts-prompt');
  if (ttsBtn) {
    const supported = 'speechSynthesis' in window;
    ttsBtn.hidden = !(settings.ttsEnabled && supported);
    ttsBtn.classList.toggle('hidden', !(settings.ttsEnabled && supported));
  }

  // Synchronize inputs in menu
  const ttsInput = document.getElementById('a11y-toggle-tts');
  if (ttsInput) ttsInput.checked = Boolean(settings.ttsEnabled);

  const fontInput = document.getElementById('a11y-toggle-font');
  if (fontInput) fontInput.checked = Boolean(settings.largeFont);

  const motionInput = document.getElementById('a11y-toggle-motion');
  if (motionInput) motionInput.checked = Boolean(settings.reducedMotion);
}

/**
 * Toggle Accessibility Toolbar Menu dropdown
 */
export function toggleA11yMenu() {
  const menu = document.getElementById('accessibility-menu');
  const btn = document.getElementById('btn-accessibility-toggle');
  if (!menu) return;

  const isHidden = menu.hidden;
  menu.hidden = !isHidden;
  menu.classList.toggle('hidden', !isHidden);
  if (btn) btn.setAttribute('aria-expanded', String(isHidden));
}

/**
 * Create a child-friendly SVG Owl Mascot element
 * @param {number} size
 * @param {string} mood 'idle' | 'happy' | 'hint'
 * @returns {SVGElement}
 */
export function createOwlSvg(size = 44, mood = 'idle') {
  const wrapper = document.createElement('div');
  wrapper.className = 'mascot-owl-container inline-flex items-center justify-center';
  wrapper.innerHTML = `
    <svg class="mascot-owl" data-mood="${mood}" width="${size}" height="${size}" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Chú cú FUNLEARN - Học vui mỗi ngày">
      <!-- Ears / Tuft -->
      <polygon points="20,34 32,16 42,34" fill="#0284C7" />
      <polygon points="80,34 68,16 58,34" fill="#0284C7" />
      <!-- Body -->
      <ellipse cx="50" cy="56" rx="35" ry="38" fill="#62C9F3" />
      <!-- Belly -->
      <ellipse cx="50" cy="64" rx="23" ry="25" fill="#FFF7E8" />
      <!-- Belly specks -->
      <path d="M 43,58 Q 50,62 57,58" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.6" />
      <path d="M 45,67 Q 50,71 55,67" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.6" />
      <!-- Big Round Eyes -->
      <circle cx="36" cy="46" r="13" fill="#FFFFFF" />
      <circle cx="64" cy="46" r="13" fill="#FFFFFF" />
      <circle cx="36" cy="46" r="7" fill="#0F172A" />
      <circle cx="64" cy="46" r="7" fill="#0F172A" />
      <circle cx="39" cy="43" r="2.5" fill="#FFFFFF" />
      <circle cx="67" cy="43" r="2.5" fill="#FFFFFF" />
      <!-- Beak -->
      <polygon points="44,52 56,52 50,61" fill="#F59E0B" />
      <!-- Wings -->
      <path d="M 15,50 Q 10,65 22,72" fill="none" stroke="#0284C7" stroke-width="5" stroke-linecap="round" />
      <path d="M 85,50 Q 90,65 78,72" fill="none" stroke="#0284C7" stroke-width="5" stroke-linecap="round" />
      <!-- Feet -->
      <ellipse cx="40" cy="93" rx="6" ry="3.5" fill="#F59E0B" />
      <ellipse cx="60" cy="93" rx="6" ry="3.5" fill="#F59E0B" />
      <!-- Hint Lightbulb -->
      <g class="owl-lightbulb opacity-0 transition-all duration-300 pointer-events-none" transform="translate(42, 2)">
        <circle cx="8" cy="8" r="7" fill="#FFC85A" />
        <path d="M 5,14 L 11,14" stroke="#D97706" stroke-width="2" stroke-linecap="round" />
        <path d="M 8,1 C 8, -2 8, -2 8, -3" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" />
      </g>
    </svg>
  `;
  return wrapper.firstElementChild;
}

/**
 * Update mood of mascots on the page
 * @param {string} mood 'idle' | 'happy' | 'hint'
 */
export function setMascotMood(mood) {
  document.querySelectorAll('.mascot-owl').forEach(svg => {
    svg.setAttribute('data-mood', mood);
  });
}

/**
 * Text-to-Speech: Read question prompt out loud
 * @param {string} text
 * @param {string} lessonId
 */
export function speakPrompt(text, lessonId = '') {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel(); // Stop prior speech

  const cleanText = text.replace(/[📐📖🌍✨🎯💡⭐🔥✓✕➔]/g, '').trim();
  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Detect language: English for 'eng-' lessons or English questions; Vietnamese otherwise
  const isEnglish = (lessonId && lessonId.startsWith('eng-')) || /^[A-Za-z0-9\s.,?!'"-]+$/.test(cleanText.slice(0, 30));
  utterance.lang = isEnglish ? 'en-US' : 'vi-VN';
  utterance.rate = 0.9; // Slightly slower, clear for primary students

  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(utterance.lang.slice(0, 2)));
  if (matchedVoice) utterance.voice = matchedVoice;

  window.speechSynthesis.speak(utterance);
}

/**
 * Web Animations API: Flying Star reward animation (60fps GPU)
 * @param {HTMLElement} startEl
 */
export function animateFlyingStar(startEl) {
  const settings = getA11ySettings();
  if (settings.reducedMotion) return;

  const target = document.getElementById('global-stars');
  if (!target || !startEl) return;

  const startRect = startEl.getBoundingClientRect();
  const endRect = target.getBoundingClientRect();

  const star = document.createElement('div');
  star.textContent = '⭐';
  star.style.position = 'fixed';
  star.style.left = '0';
  star.style.top = '0';
  star.style.fontSize = '28px';
  star.style.pointerEvents = 'none';
  star.style.zIndex = '9999';
  document.body.appendChild(star);

  const startX = startRect.left + startRect.width / 2;
  const startY = startRect.top + startRect.height / 2;
  const endX = endRect.left + endRect.width / 2;
  const endY = endRect.top + endRect.height / 2;

  const midX = (startX + endX) / 2;
  const midY = Math.min(startY, endY) - 50;

  const anim = star.animate([
    { transform: `translate3d(${startX}px, ${startY}px, 0) scale(1.6)`, opacity: 1 },
    { transform: `translate3d(${midX}px, ${midY}px, 0) scale(2)`, opacity: 0.95, offset: 0.4 },
    { transform: `translate3d(${endX}px, ${endY}px, 0) scale(0.6)`, opacity: 0.2 }
  ], {
    duration: 650,
    easing: 'cubic-bezier(0.2, 0.8, 0.25, 1)'
  });

  anim.onfinish = () => {
    star.remove();
    // Pulse stars counter on header
    target.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.35)' },
      { transform: 'scale(1)' }
    ], { duration: 240, easing: 'ease-out' });
  };
}

/**
 * Lightweight 2D Canvas Confetti (28 particles, 1.8s duration, zero heavy libraries)
 */
export function launchConfetti() {
  const settings = getA11ySettings();
  if (settings.reducedMotion) return;

  let canvas = document.getElementById('confetti-canvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'confetti-canvas';
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#62C9F3', '#FFC85A', '#FF91A8', '#78D9AE', '#A99AF5', '#F59E0B'];
  const particleCount = 28;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 180,
      y: canvas.height * 0.42 + (Math.random() - 0.5) * 80,
      vx: (Math.random() - 0.5) * 14,
      vy: -Math.random() * 10 - 4,
      size: Math.random() * 8 + 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.2,
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
      alpha: 1
    });
  }

  const startTime = performance.now();
  const duration = 1800; // 1.8 seconds

  function frame(now) {
    const elapsed = now - startTime;
    if (elapsed > duration) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const progress = elapsed / duration;
    const fade = progress > 0.6 ? (1 - progress) / 0.4 : 1;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4; // gravity
      p.vx *= 0.98; // air friction
      p.rotation += p.vRot;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha * fade);
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

/**
 * Switch active screen and update standard boolean 'hidden' attribute
 * @param {string} targetScreenId
 */
export function navigateScreen(targetScreenId) {
  SCREENS.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    if (id === targetScreenId) {
      el.hidden = false;
      el.classList.remove('hidden');
      el.classList.add('fade-slide-in');
    } else {
      el.hidden = true;
      el.classList.add('hidden');
      el.classList.remove('fade-slide-in');
    }
  });

  const header = document.getElementById('global-app-header');
  if (header) {
    if (targetScreenId === 'screen-start') {
      header.hidden = true;
      header.classList.add('hidden');
    } else {
      header.hidden = false;
      header.classList.remove('hidden');
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Open and render the Step 1 Theory / Summary Card Modal
 * @param {object} lessonInfo
 */
export function renderSummaryModal(lessonInfo) {
  const modal = document.getElementById('modal-summary');
  if (!modal || !lessonInfo) return;

  const titleEl = document.getElementById('summary-modal-title');
  if (titleEl) {
    titleEl.textContent = lessonInfo.lessonTitle || lessonInfo.title || 'Ghi nhớ kiến thức';
  }

  const iconEl = document.getElementById('summary-modal-icon');
  if (iconEl) {
    iconEl.textContent = lessonInfo.icon || '📖';
  }

  const keypointsList = document.getElementById('summary-modal-keypoints');
  if (keypointsList) {
    keypointsList.replaceChildren();
    const summary = lessonInfo.summaryCard || {};
    const points = summary.keyPoints || [
      'Đọc kĩ đề bài và xác định yêu cầu trọng tâm.',
      'Vận dụng quy tắc và công thức đã học để giải từng bước.',
      'Kiểm tra lại kết quả trước khi đưa ra câu trả lời.'
    ];

    const frag = document.createDocumentFragment();
    points.forEach(pt => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2.5';
      const bullet = document.createElement('span');
      bullet.className = 'text-amber-500 font-black text-sm shrink-0 mt-0.5';
      bullet.textContent = '•';
      const spanText = document.createElement('span');
      spanText.textContent = pt;
      li.append(bullet, spanText);
      frag.appendChild(li);
    });
    keypointsList.appendChild(frag);
  }

  const exampleEl = document.getElementById('summary-modal-example');
  const exampleWrapper = document.getElementById('summary-modal-example-wrapper');
  if (exampleEl && exampleWrapper) {
    const summary = lessonInfo.summaryCard || {};
    if (summary.example) {
      exampleWrapper.hidden = false;
      exampleWrapper.classList.remove('hidden');
      exampleEl.textContent = summary.example;
    } else {
      exampleWrapper.hidden = true;
      exampleWrapper.classList.add('hidden');
    }
  }

  modal.hidden = false;
  modal.classList.remove('hidden');
}

/**
 * Close the Summary Modal
 */
export function closeSummaryModal() {
  const modal = document.getElementById('modal-summary');
  if (modal) {
    modal.hidden = true;
    modal.classList.add('hidden');
  }
}

/**
 * Render Lesson Completion Celebration Modal
 * @param {object} param0
 */
export function renderCompletionModal({ starsEarned, totalQuestions, correctCount }) {
  const modal = document.getElementById('modal-completion');
  if (!modal) return;

  const mascotBox = document.getElementById('completion-mascot-container');
  if (mascotBox) {
    mascotBox.replaceChildren();
    mascotBox.appendChild(createOwlSvg(68, 'happy'));
  }

  const starsEl = document.getElementById('completion-stars-earned');
  if (starsEl) {
    // Count up animation
    starsEl.textContent = `+0 ⭐`;
    let count = 0;
    const step = Math.max(1, Math.floor(starsEarned / 10));
    const interval = setInterval(() => {
      count = Math.min(starsEarned, count + step);
      starsEl.textContent = `+${count} ⭐`;
      if (count >= starsEarned) clearInterval(interval);
    }, 40);
  }

  const rateEl = document.getElementById('completion-correct-rate');
  if (rateEl) {
    rateEl.textContent = `${correctCount}/${totalQuestions}`;
  }

  modal.hidden = false;
  modal.classList.remove('hidden');

  // Shoot confetti celebration
  launchConfetti();
}

/**
 * Close Completion Modal
 */
export function closeCompletionModal() {
  const modal = document.getElementById('modal-completion');
  if (modal) {
    modal.hidden = true;
    modal.classList.add('hidden');
  }
}

/**
 * Synchronize header metrics with store
 * @param {object} state
 */
export function renderHeader(state) {
  const starsEl = document.getElementById('global-stars');
  if (starsEl) starsEl.textContent = String(state.stars);

  const streakEl = document.getElementById('global-streak');
  if (streakEl) streakEl.textContent = `${state.streakDays} ngày`;

  const nameInput = document.getElementById('header-student-name-input');
  if (nameInput && document.activeElement !== nameInput) {
    nameInput.value = state.studentName || '';
  }

  const welcomeEl = document.getElementById('home-welcome-text');
  if (welcomeEl) {
    welcomeEl.textContent = state.studentName
      ? `Chào mừng ${state.studentName} đến với FUNLEARN - Học vui mỗi ngày!`
      : 'Chào mừng em đến với FUNLEARN - Học vui mỗi ngày!';
  }

  const avatarEl = document.getElementById('header-avatar');
  if (avatarEl) avatarEl.textContent = state.studentAvatar;

  // Mascot in header logo
  const logoBox = document.getElementById('header-logo-mascot');
  if (logoBox && logoBox.childElementCount === 0) {
    logoBox.appendChild(createOwlSvg(38, 'idle'));
  }

  // Grade button highlight
  [3, 4, 5].forEach(num => {
    const btn = document.getElementById(`btn-grade-${num}`);
    if (!btn) return;
    if (num === state.studentGrade) {
      btn.className = 'px-4 py-1.5 rounded-xl font-black text-xs transition-all bg-[#FFC85A] text-slate-900 shadow-sm ring-2 ring-amber-300';
    } else {
      btn.className = 'px-4 py-1.5 rounded-xl font-bold text-xs text-slate-600 hover:text-slate-900 transition-all';
    }
  });

  applyA11ySettings();
}

/**
 * Synchronize welcome screen profile selection cards
 * @param {number} selectedGrade
 */
export function renderStartScreen(selectedGrade) {
  // Mascot in start screen logo
  const startLogo = document.getElementById('start-logo-mascot');
  if (startLogo && startLogo.childElementCount === 0) {
    startLogo.appendChild(createOwlSvg(44, 'idle'));
  }

  [3, 4, 5].forEach(num => {
    const card = document.getElementById(`grade-card-${num}`);
    if (!card) return;
    card.classList.remove(
      'border-[#62C9F3]', 'bg-sky-50/70',
      'border-[#FF91A8]', 'bg-pink-50/70',
      'border-[#FFC85A]', 'bg-amber-50/70'
    );
    card.classList.add('border-slate-200', 'bg-white');

    if (num === selectedGrade) {
      card.classList.remove('border-slate-200', 'bg-white');
      if (num === 3) card.classList.add('border-[#62C9F3]', 'bg-sky-50/70');
      else if (num === 4) card.classList.add('border-[#FF91A8]', 'bg-pink-50/70');
      else if (num === 5) card.classList.add('border-[#FFC85A]', 'bg-amber-50/70');
    }
  });
}

/**
 * Render subject lessons list
 * @param {object} state
 * @param {object} gradeData
 */
export function renderSubjectDetail(state, gradeData) {
  if (!gradeData || !gradeData.subjects) return;
  const sub = gradeData.subjects[state.activeSubject];
  if (!sub) return;

  const titleEl = document.getElementById('subpage-title');
  if (titleEl) {
    titleEl.textContent = `${sub.title || 'Môn Học'}`;
  }

  const iconEl = document.getElementById('subpage-icon');
  if (iconEl) iconEl.textContent = sub.icon || '📚';

  const container = document.getElementById('subpage-lessons-list');
  if (!container) return;
  container.replaceChildren();

  const fragment = document.createDocumentFragment();

  (sub.lessons || []).forEach(les => {
    const isCompleted = state.completedLessons.includes(les.id);
    const card = document.createElement('div');

    if (isCompleted) {
      card.className = 'clay-card-nested p-5 border-l-6 border-l-emerald-500 bg-white flex items-center justify-between';

      const left = document.createElement('div');
      left.className = 'flex items-center gap-3';
      const codeSpan = document.createElement('span');
      codeSpan.className = 'text-xs font-black text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md';
      codeSpan.textContent = les.code;
      const titleH4 = document.createElement('h4');
      titleH4.className = 'font-black text-slate-800 text-base md:text-lg';
      titleH4.textContent = les.lessonTitle || les.title;
      left.append(codeSpan, titleH4);

      const right = document.createElement('div');
      right.className = 'flex items-center gap-3';
      const retryBtn = document.createElement('button');
      retryBtn.className = 'px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-black text-xs rounded-xl transition';
      retryBtn.textContent = 'Luyện lại ⟳';
      retryBtn.dataset.action = 'start-lesson';
      retryBtn.dataset.lessonId = les.id;

      const checkIcon = document.createElement('div');
      checkIcon.className = 'w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-base shadow-xs shrink-0';
      checkIcon.textContent = '✓';

      right.append(retryBtn, checkIcon);
      card.append(left, right);
    } else if (les.status === 'ready' || les.status === 'in_progress') {
      card.className = 'clay-card p-5 border-2 border-[#62C9F3] bg-sky-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm';

      const left = document.createElement('div');
      left.className = 'flex items-center gap-3';
      const codeSpan = document.createElement('span');
      codeSpan.className = 'text-xs font-black text-sky-900 bg-[#62C9F3]/30 px-2.5 py-1 rounded-md';
      codeSpan.textContent = les.code;
      const titleH4 = document.createElement('h4');
      titleH4.className = 'font-black text-slate-800 text-base md:text-lg';
      titleH4.textContent = les.lessonTitle || les.title;
      left.append(codeSpan, titleH4);

      const startBtn = document.createElement('button');
      startBtn.className = 'px-6 py-3.5 bg-[#62C9F3] hover:bg-[#4db6e2] text-slate-900 font-black text-sm rounded-2xl clay-btn flex items-center justify-center gap-2 shrink-0';
      startBtn.dataset.action = 'start-lesson';
      startBtn.dataset.lessonId = les.id;

      const spanText = document.createElement('span');
      spanText.textContent = 'BẮT ĐẦU';
      const spanArrow = document.createElement('span');
      spanArrow.textContent = '➔';
      startBtn.append(spanText, spanArrow);

      card.append(left, startBtn);
    } else {
      card.className = 'clay-card-nested p-5 bg-slate-50 border border-slate-200 opacity-60 flex items-center justify-between';

      const left = document.createElement('div');
      left.className = 'flex items-center gap-3';
      const codeSpan = document.createElement('span');
      codeSpan.className = 'text-xs font-black text-slate-400 bg-slate-200 px-2.5 py-1 rounded-md';
      codeSpan.textContent = les.code;
      const titleH4 = document.createElement('h4');
      titleH4.className = 'font-bold text-slate-600 text-base md:text-lg';
      titleH4.textContent = les.lessonTitle || les.title;
      left.append(codeSpan, titleH4);

      const lockIcon = document.createElement('div');
      lockIcon.className = 'w-10 h-10 rounded-2xl bg-slate-200 text-slate-400 flex items-center justify-center text-base shrink-0';
      lockIcon.textContent = '🔒';

      card.append(left, lockIcon);
    }

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

/**
 * Render practice hub with grade-specific focus cards
 * @param {object} state
 * @param {object} gradeData
 */
export function renderPracticeHub(state, gradeData) {
  const g = state.studentGrade;
  const gradeLabelEl = document.getElementById('practice-hub-grade-badge');
  if (gradeLabelEl) {
    gradeLabelEl.textContent = `Đang chọn Khối ${g}`;
  }

  const container = document.getElementById('practice-hub-dynamic-cards');
  if (!container || !gradeData || !gradeData.subjects) return;
  container.replaceChildren();

  const subjects = gradeData.subjects;
  const toan = subjects.toan?.lessons?.[0];
  const tv = subjects['tieng-viet']?.lessons?.[0];
  const eng = subjects['tieng-anh']?.lessons?.[0];

  const cardsData = [
    { sub: toan, name: `Toán Lớp ${g}`, bg: 'bg-sky-50/70', border: 'border-sky-200', btnColor: 'bg-[#62C9F3]', desc: `Chuyên đề trọng tâm Toán ${g}` },
    { sub: tv, name: `Tiếng Việt Lớp ${g}`, bg: 'bg-pink-50/70', border: 'border-pink-200', btnColor: 'bg-[#FF91A8]', desc: `Chuyên đề nâng cao Tiếng Việt ${g}` },
    { sub: eng, name: `Tiếng Anh Lớp ${g}`, bg: 'bg-emerald-50/70', border: 'border-emerald-200', btnColor: 'bg-[#78D9AE]', desc: `Chuyên đề học tốt Tiếng Anh ${g}` }
  ];

  const fragment = document.createDocumentFragment();

  cardsData.forEach(item => {
    if (!item.sub) return;
    const card = document.createElement('div');
    card.className = `p-5 ${item.bg} rounded-3xl border-2 ${item.border} flex flex-col justify-between space-y-3 shadow-xs`;

    const topSection = document.createElement('div');
    topSection.className = 'space-y-1.5';

    const headerRow = document.createElement('div');
    headerRow.className = 'flex items-center justify-between';
    const codeTag = document.createElement('span');
    codeTag.className = 'text-xs font-black text-slate-800 bg-white px-2.5 py-0.5 rounded-md';
    codeTag.textContent = item.sub.code;
    const gradeTag = document.createElement('span');
    gradeTag.className = 'text-xs font-bold text-slate-500';
    gradeTag.textContent = item.name;
    headerRow.append(codeTag, gradeTag);

    const titleH4 = document.createElement('h4');
    titleH4.className = 'font-black text-slate-900 text-base leading-snug';
    titleH4.textContent = item.sub.lessonTitle || item.sub.title;

    const descP = document.createElement('p');
    descP.className = 'text-xs text-slate-600 font-medium';
    descP.textContent = item.desc;

    topSection.append(headerRow, titleH4, descP);

    const startBtn = document.createElement('button');
    startBtn.className = `w-full py-2.5 ${item.btnColor} text-slate-900 font-black text-xs rounded-xl clay-btn`;
    startBtn.textContent = 'Bắt Đầu ➔';
    startBtn.dataset.action = 'start-lesson';
    startBtn.dataset.lessonId = item.sub.id;

    card.append(topSection, startBtn);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

/**
 * Render skills/analytics screen with distinct "Luyện lại" button for each skill
 * @param {object} state
 * @param {object} gradeData
 */
export function renderSkills(state, gradeData) {
  const analysis = getSkillsAnalysis(state.studentGrade, gradeData);

  const masteredList = document.getElementById('skills-mastered-list');
  const needsReviewList = document.getElementById('skills-review-list');

  if (masteredList) {
    masteredList.replaceChildren();
    const frag = document.createDocumentFragment();
    analysis.mastered.forEach(item => {
      const li = document.createElement('li');
      li.className = 'flex items-center gap-3 bg-white p-4 rounded-2xl border border-emerald-200 shadow-2xs';
      const check = document.createElement('span');
      check.className = 'text-emerald-600 font-black text-xl shrink-0';
      check.textContent = '✓';
      const text = document.createElement('span');
      text.className = 'flex-1 text-sm sm:text-base';
      text.textContent = `${item.subject}: ${item.title}`;
      li.append(check, text);
      frag.appendChild(li);
    });
    masteredList.appendChild(frag);
  }

  if (needsReviewList) {
    needsReviewList.replaceChildren();
    const frag = document.createDocumentFragment();
    analysis.needsReview.forEach(item => {
      const li = document.createElement('li');
      li.className = 'flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-amber-200 shadow-2xs';

      const left = document.createElement('div');
      left.className = 'flex items-start gap-3';
      const warn = document.createElement('span');
      warn.className = 'text-amber-600 font-black text-xl shrink-0 mt-0.5';
      warn.textContent = '!';

      const info = document.createElement('div');
      info.className = 'space-y-0.5';
      const text = document.createElement('span');
      text.className = 'font-bold text-slate-800 text-sm sm:text-base block';
      text.textContent = `${item.subject}: ${item.title}`;
      info.appendChild(text);

      if (item.accuracy !== null) {
        const accSpan = document.createElement('span');
        accSpan.className = 'text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md inline-block border border-amber-200';
        accSpan.textContent = `Độ chính xác hiện tại: ${item.accuracy}% (${item.attempts} lần thử)`;
        info.appendChild(accSpan);
      }

      left.append(warn, info);

      // Distinct Retry Button for EACH Skill
      const retryBtn = document.createElement('button');
      retryBtn.className = 'px-3.5 py-2 bg-[#62C9F3] hover:bg-[#4ebfe8] text-slate-900 font-black rounded-xl clay-btn text-xs shrink-0 self-end sm:self-center shadow-xs';
      retryBtn.textContent = 'LUYỆN LẠI ➔';
      retryBtn.dataset.action = 'review-skill';
      retryBtn.dataset.skillTag = item.skillTag || '';
      retryBtn.dataset.lessonId = item.lessonId || '';

      li.append(left, retryBtn);
      frag.appendChild(li);
    });
    needsReviewList.appendChild(frag);
  }
}

/**
 * Render Badges screen with progress bars and unlocked vs locked states
 */
export function renderBadges() {
  const container = document.getElementById('badges-grid-container');
  if (!container) return;
  container.replaceChildren();

  const badges = getBadgesStatus();
  const fragment = document.createDocumentFragment();

  badges.forEach(b => {
    const card = document.createElement('div');
    card.className = b.isUnlocked
      ? 'clay-card-nested p-6 text-center space-y-3 badge-card unlocked flex flex-col items-center justify-center'
      : 'clay-card-nested p-6 text-center space-y-3 badge-card locked flex flex-col items-center justify-center';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'text-5xl';
    iconSpan.textContent = b.icon;

    const titleH4 = document.createElement('h4');
    titleH4.className = b.isUnlocked ? 'font-black text-slate-800 text-lg' : 'font-bold text-slate-600 text-lg';
    titleH4.textContent = b.name;

    const condP = document.createElement('p');
    condP.className = 'text-xs text-slate-500 font-medium';
    condP.textContent = b.conditionText;

    // Progress Bar
    const progressWrapper = document.createElement('div');
    progressWrapper.className = 'w-full bg-slate-200 rounded-full h-2.5 overflow-hidden mt-1';
    const progressBar = document.createElement('div');
    progressBar.className = b.isUnlocked ? 'bg-amber-400 h-2.5 rounded-full' : 'bg-slate-400 h-2.5 rounded-full';
    const percent = Math.min(100, Math.round((b.current / b.target) * 100));
    progressBar.style.width = `${percent}%`;
    progressWrapper.appendChild(progressBar);

    const statusBadge = document.createElement('span');
    statusBadge.className = b.isUnlocked
      ? 'text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300'
      : 'text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-600';
    statusBadge.textContent = b.isUnlocked ? `✓ Đã mở khóa (${b.progressText})` : `🔒 Chưa mở khóa (${b.progressText})`;

    card.append(iconSpan, titleH4, condP, progressWrapper, statusBadge);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

/**
 * Render Question Stage in Exercise Room
 * @param {object} session
 * @param {object} gradeData
 */
export function renderQuestionStage(session, gradeData) {
  const q = session.getCurrentQuestion();
  if (!q) return;

  const qType = q.type || 'choice';

  // Smooth Progress Bar & Counter
  const total = session.getTotalCount();
  const counterEl = document.getElementById('ex-counter-label');
  if (counterEl) {
    counterEl.textContent = `Câu ${session.currentIndex + 1} / ${total}`;
  }

  const progressBar = document.getElementById('ex-progress-bar');
  if (progressBar) {
    const pct = Math.round(((session.currentIndex + 1) / total) * 100);
    progressBar.style.width = `${pct}%`;
  }

  const breadcrumbEl = document.getElementById('ex-breadcrumb-tag');
  if (breadcrumbEl) {
    const subjectTitle = session.lessonInfo.subjectTitle || 'Luyện Tập';
    const lessonTitle = session.lessonInfo.lessonTitle || session.lessonInfo.title || 'Chuyên đề';
    breadcrumbEl.textContent = `${subjectTitle} • ${lessonTitle}`;
  }

  const tagEl = document.getElementById('ex-tag');
  if (tagEl) {
    const typeLabel = (qType === 'input' || qType === 'fill') ? 'Điền số / từ' : ((qType === 'match') ? 'Ghép đôi nối cột' : 'Trắc nghiệm');
    tagEl.textContent = q.tag || typeLabel;
  }

  const promptEl = document.getElementById('ex-prompt');
  if (promptEl) promptEl.textContent = q.prompt;

  // Mascot in Exercise Room: STATIC idle by default (Mayer & Fiorella rule)
  const mascotBox = document.getElementById('ex-illustration-container');
  if (mascotBox) {
    mascotBox.replaceChildren();
    mascotBox.appendChild(createOwlSvg(64, 'idle'));
  }

  // Initial State: "Chưa trả lời", ẨN gợi ý và lời giải
  const statusBadge = document.getElementById('ex-status-badge');
  if (statusBadge) {
    statusBadge.textContent = 'Chưa trả lời';
    statusBadge.className = 'text-xs font-extrabold px-3 py-1 rounded-full bg-slate-100 text-slate-600';
  }

  const feedbackBox = document.getElementById('ex-feedback-box');
  if (feedbackBox) {
    feedbackBox.hidden = true;
    feedbackBox.classList.add('hidden');
    feedbackBox.replaceChildren();
  }

  const hintBox = document.getElementById('ex-hint-box');
  if (hintBox) {
    hintBox.hidden = true;
    hintBox.classList.add('hidden');
    const hintText = document.getElementById('ex-hint-text');
    if (hintText) hintText.textContent = q.hint || 'Em hãy đọc kĩ đề bài và tính toán từng bước nhé!';
  }

  const solutionBox = document.getElementById('ex-solution-box');
  if (solutionBox) {
    solutionBox.hidden = true;
    solutionBox.classList.add('hidden');
    const solutionText = document.getElementById('ex-solution-text');
    if (solutionText) solutionText.textContent = '';
  }

  const btnCheck = document.getElementById('btn-ex-check');
  if (btnCheck) {
    btnCheck.disabled = false;
    btnCheck.hidden = false;
    btnCheck.classList.remove('hidden');
  }

  const btnNext = document.getElementById('btn-ex-next');
  if (btnNext) {
    btnNext.disabled = true;
    btnNext.className = 'px-8 py-4 bg-slate-200 text-slate-400 font-extrabold rounded-2xl text-base flex items-center justify-center gap-2 cursor-not-allowed transition';
    const isLast = session.isLastQuestion();
    btnNext.replaceChildren();
    const spanText = document.createElement('span');
    spanText.textContent = isLast ? 'HOÀN THÀNH 🎉' : 'CÂU TIẾP THEO';
    const spanArrow = document.createElement('span');
    spanArrow.textContent = isLast ? '' : '➔';
    btnNext.append(spanText, spanArrow);
  }

  // Answer Zone Rendering
  const answerZone = document.getElementById('ex-answer-zone');
  if (!answerZone) return;
  answerZone.replaceChildren();

  if (qType === 'choice' || qType === 'mcq' || qType === 'true_false' || qType === 'tf') {
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 gap-4';

    (q.options || []).forEach(opt => {
      const btn = document.createElement('button');
      const isDimmed = session.disabledOptions.has(opt.id);

      if (isDimmed) {
        btn.className = 'w-full min-h-[64px] p-4 text-left rounded-2xl border-2 border-rose-200 bg-slate-100 text-slate-400 line-through opacity-45 cursor-not-allowed flex items-center justify-between transition';
        btn.disabled = true;
      } else {
        btn.className = 'w-full min-h-[64px] p-4 text-left rounded-2xl border-2 border-slate-200 bg-white font-extrabold text-slate-800 text-base flex items-center justify-between clay-option option-item transition';
      }

      btn.dataset.action = 'select-choice';
      btn.dataset.id = opt.id;

      const left = document.createElement('div');
      left.className = 'flex items-center gap-3';
      const badge = document.createElement('span');
      badge.className = 'w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-black text-slate-700';
      badge.textContent = opt.id;
      const text = document.createElement('span');
      text.textContent = opt.text;
      left.append(badge, text);

      const dot = document.createElement('div');
      dot.className = 'w-7 h-7 rounded-full border-2 border-slate-300 flex items-center justify-center text-sm font-black indicator-dot';

      btn.append(left, dot);
      grid.appendChild(btn);
    });

    answerZone.appendChild(grid);
  } else if (qType === 'input' || qType === 'fill') {
    const container = document.createElement('div');
    container.className = 'p-6 bg-slate-50 rounded-3xl border-2 border-slate-200/80 max-w-lg space-y-3';

    const label = document.createElement('label');
    label.className = 'block text-xs font-black uppercase text-slate-600 tracking-wider';
    label.htmlFor = 'ex-input-field';
    label.textContent = 'Nhập kết quả số hoặc từ của em vào ô bên dưới:';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'ex-input-field';
    input.className = 'w-full h-16 px-6 text-2xl font-black text-center text-slate-900 bg-white border-2 border-slate-300 focus:border-[#62C9F3] focus:outline-none rounded-2xl shadow-inner';
    input.placeholder = 'Nhập câu trả lời...';

    container.append(label, input);
    answerZone.appendChild(container);

    setTimeout(() => input.focus(), 120);
  } else if (qType === 'match') {
    renderMatchInteraction(answerZone, q, session);
  }

  applyA11ySettings();
}

/**
 * Render Two-tap Pairing with Bezier Curve SVG Line overlay
 * @param {HTMLElement} container
 * @param {object} q
 * @param {object} session
 */
function renderMatchInteraction(container, q, session) {
  const outer = document.createElement('div');
  outer.className = 'grid grid-cols-1 md:grid-cols-2 gap-8 p-4 bg-slate-50/70 rounded-3xl border-2 border-slate-200 relative';
  outer.id = 'match-grid-container';

  // SVG Overlay for drawing Bezier connecting curves
  const svgOverlay = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgOverlay.setAttribute('class', 'match-canvas-overlay');
  svgOverlay.setAttribute('id', 'match-svg-canvas');
  outer.appendChild(svgOverlay);

  const leftCol = document.createElement('div');
  leftCol.className = 'space-y-3 z-10';
  leftCol.id = 'match-left-col';
  const leftHeader = document.createElement('p');
  leftHeader.className = 'text-xs font-black uppercase text-slate-500';
  leftHeader.textContent = 'CỘT A (CHỌN ĐỂ GHÉP / BẤM LẠI ĐỂ BỎ CHỌN)';
  leftCol.appendChild(leftHeader);

  const rightCol = document.createElement('div');
  rightCol.className = 'space-y-3 z-10';
  rightCol.id = 'match-right-col';
  const rightHeader = document.createElement('p');
  rightHeader.className = 'text-xs font-black uppercase text-slate-500';
  rightHeader.textContent = 'CỘT B (CHẠM ĐỂ GHÉP / CHẠM ĐỂ HỦY GHÉP)';
  rightCol.appendChild(rightHeader);

  // 1. Render Left Column (items keep their defined order)
  (q.pairs || []).forEach(p => {
    const lBtn = document.createElement('button');
    lBtn.className = 'w-full h-14 px-5 rounded-2xl border-2 border-slate-200 bg-white font-extrabold text-slate-800 text-sm flex items-center justify-between clay-option match-left-item transition';
    lBtn.dataset.id = p.id;
    const lText = document.createElement('span');
    lText.textContent = p.left;
    const lBadge = document.createElement('span');
    lBadge.className = 'match-left-status text-xs bg-slate-100 px-2 py-0.5 rounded-md';
    lBadge.textContent = 'Chọn';
    lBtn.append(lText, lBadge);

    lBtn.addEventListener('click', () => {
      const isSelected = session.toggleMatchLeft(p.id);
      document.querySelectorAll('.match-left-item').forEach(b => {
        b.classList.remove('border-[#62C9F3]', 'bg-sky-100', 'ring-2', 'ring-[#62C9F3]/30');
        const st = b.querySelector('.match-left-status');
        if (st) st.textContent = 'Chọn';
      });

      if (isSelected) {
        lBtn.classList.add('border-[#62C9F3]', 'bg-sky-100', 'ring-2', 'ring-[#62C9F3]/30');
        lBadge.textContent = 'Đang chọn ✦';
      }
    });
    leftCol.appendChild(lBtn);
  });

  // 2. Render Right Column: SHUFFLED order so answers are NOT in the same row!
  const rightPairs = typeof session.getShuffledRightPairs === 'function'
    ? session.getShuffledRightPairs(q)
    : [...(q.pairs || [])];

  rightPairs.forEach(p => {
    const rBtn = document.createElement('button');
    rBtn.className = 'w-full h-14 px-5 rounded-2xl border-2 border-slate-200 bg-white font-extrabold text-slate-800 text-sm flex items-center justify-between clay-option match-right-item transition';
    rBtn.dataset.match = p.id;
    const rText = document.createElement('span');
    rText.textContent = p.right;
    const rStatus = document.createElement('span');
    rStatus.className = 'match-status text-xs text-slate-400';
    rStatus.textContent = 'Ghép vào đây';
    rBtn.append(rText, rStatus);

    rBtn.addEventListener('click', () => {
      // Unpair if already paired and no active left item
      const isPaired = Object.values(session.matchedPairs).includes(p.id);
      if (isPaired && !session.activeMatchLeft) {
        session.unpairMatch(p.id);
        rBtn.classList.remove('border-emerald-500', 'bg-emerald-50', 'ring-2', 'ring-emerald-200');
        rStatus.textContent = 'Ghép vào đây';
        drawMatchBezierCurves(outer, session);
        return;
      }

      if (!session.activeMatchLeft) {
        alert('Em hãy bấm chọn một mục ở Cột A trước nhé!');
        return;
      }

      session.setMatch(session.activeMatchLeft, p.id);
      rBtn.classList.add('border-emerald-500', 'bg-emerald-50');
      rStatus.textContent = '✓ Đã ghép';

      // Clear left highlights
      document.querySelectorAll('.match-left-item').forEach(b => {
        b.classList.remove('border-[#62C9F3]', 'bg-sky-100', 'ring-2', 'ring-[#62C9F3]/30');
        const st = b.querySelector('.match-left-status');
        if (st) st.textContent = 'Chọn';
      });

      // Draw SVG connecting Bezier Curve
      drawMatchBezierCurves(outer, session);
    });
    rightCol.appendChild(rBtn);
  });

  outer.append(leftCol, rightCol);
  container.appendChild(outer);
}

/**
 * Draw animated Bezier Curves between paired items in tap-to-match
 * @param {HTMLElement} outer
 * @param {object} session
 */
function drawMatchBezierCurves(outer, session) {
  const svg = outer.querySelector('#match-svg-canvas');
  if (!svg) return;
  svg.replaceChildren();

  const outerRect = outer.getBoundingClientRect();

  Object.entries(session.matchedPairs).forEach(([leftId, rightId]) => {
    const lBtn = outer.querySelector(`.match-left-item[data-id="${leftId}"]`);
    const rBtn = outer.querySelector(`.match-right-item[data-match="${rightId}"]`);
    if (!lBtn || !rBtn) return;

    const lRect = lBtn.getBoundingClientRect();
    const rRect = rBtn.getBoundingClientRect();

    const x1 = lRect.right - outerRect.left;
    const y1 = lRect.top + lRect.height / 2 - outerRect.top;
    const x2 = rRect.left - outerRect.left;
    const y2 = rRect.top + rRect.height / 2 - outerRect.top;
    const dx = x2 - x1;

    // Cubic Bezier curve control points
    const cx1 = x1 + dx * 0.45;
    const cy1 = y1;
    const cx2 = x2 - dx * 0.45;
    const cy2 = y2;

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`);
    path.setAttribute('class', 'match-curve-line');
    svg.appendChild(path);
  });
}

/**
 * Render 3-Tier Pedagogical Feedback (Chống Soft-Lock)
 * @param {object} result
 * @param {object} session
 */
export function renderFeedback(result, session) {
  const card = document.getElementById('ex-question-card');
  const feedbackBox = document.getElementById('ex-feedback-box');
  const hintBox = document.getElementById('ex-hint-box');
  const solutionBox = document.getElementById('ex-solution-box');
  const solutionText = document.getElementById('ex-solution-text');
  const statusBadge = document.getElementById('ex-status-badge');
  const btnCheck = document.getElementById('btn-ex-check');
  const btnNext = document.getElementById('btn-ex-next');

  if (!feedbackBox) return;

  if (result.isCorrect) {
    // CORRECT ANSWER
    feedbackBox.hidden = false;
    feedbackBox.classList.remove('hidden');
    feedbackBox.className = 'p-5 rounded-2xl text-sm font-bold flex items-start gap-3 bg-emerald-50 border-2 border-emerald-300 text-emerald-950 pop-anim';
    feedbackBox.replaceChildren();

    const icon = document.createElement('span');
    icon.className = 'text-3xl shrink-0';
    icon.textContent = '🌟';

    const info = document.createElement('div');
    const h5 = document.createElement('h5');
    h5.className = 'text-base font-black text-emerald-900';
    h5.textContent = result.message;
    info.appendChild(h5);

    feedbackBox.append(icon, info);

    if (statusBadge) {
      statusBadge.textContent = '✓ Đã hoàn thành';
      statusBadge.className = 'text-xs font-black px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300';
    }

    if (btnCheck) {
      btnCheck.hidden = true;
      btnCheck.classList.add('hidden');
    }

    if (btnNext) {
      btnNext.disabled = false;
      btnNext.className = 'px-8 py-4 bg-emerald-500 text-white font-black rounded-2xl text-base clay-btn flex items-center justify-center gap-2 cursor-pointer shadow-md';
    }

    // Set Mascot to 'happy' mood!
    setMascotMood('happy');

    // Flying Star reward animation
    animateFlyingStar(feedbackBox);

    // Disable all options/inputs so child cannot accidentally alter them
    document.querySelectorAll('.option-item, #ex-input-field, .match-left-item, .match-right-item').forEach(el => {
      el.disabled = true;
    });

  } else {
    // INCORRECT ANSWER (3-TIER GUIDANCE)
    if (card) {
      card.classList.add('shake-effect');
      setTimeout(() => card.classList.remove('shake-effect'), 500);
    }

    feedbackBox.hidden = false;
    feedbackBox.classList.remove('hidden');
    feedbackBox.replaceChildren();

    const tier = result.tier || result.attempts || 1;

    if (tier === 1) {
      // TẦNG 1: Động viên nhẹ nhàng, làm mờ phương án sai, CHƯA hiện gợi ý
      feedbackBox.className = 'p-5 rounded-2xl text-sm font-bold flex items-start gap-3 bg-rose-50 border-2 border-rose-300 text-rose-950 pop-anim';
      const icon = document.createElement('span');
      icon.className = 'text-3xl shrink-0';
      icon.textContent = '💪';
      const info = document.createElement('div');
      const h5 = document.createElement('h5');
      h5.className = 'text-base font-black text-rose-900';
      h5.textContent = result.message;
      info.appendChild(h5);
      feedbackBox.append(icon, info);

      // Dim the wrongly selected option
      if (result.wrongChoice) {
        const wrongBtn = document.querySelector(`.option-item[data-id="${result.wrongChoice}"]`);
        if (wrongBtn) {
          wrongBtn.classList.remove('border-[#62C9F3]', 'bg-sky-50', 'ring-2', 'ring-[#62C9F3]/30');
          wrongBtn.classList.add('border-rose-200', 'bg-slate-100', 'text-slate-400', 'line-through', 'opacity-45', 'cursor-not-allowed');
          wrongBtn.disabled = true;
          const dot = wrongBtn.querySelector('.indicator-dot');
          if (dot) dot.textContent = '✕';
        }
      }

      // Soft-shake match grid if matching error
      const matchGrid = document.getElementById('match-grid-container');
      if (matchGrid) {
        matchGrid.classList.add('soft-shake');
        setTimeout(() => matchGrid.classList.remove('soft-shake'), 400);
      }

    } else if (tier === 2) {
      // TẦNG 2: Tự động mở gợi ý phương pháp, Mascot làm dáng 'hint'
      feedbackBox.className = 'p-5 rounded-2xl text-sm font-bold flex items-start gap-3 bg-amber-50 border-2 border-amber-300 text-amber-950 pop-anim';
      const icon = document.createElement('span');
      icon.className = 'text-3xl shrink-0';
      icon.textContent = '💡';
      const info = document.createElement('div');
      const h5 = document.createElement('h5');
      h5.className = 'text-base font-black text-amber-900';
      h5.textContent = result.message;
      info.appendChild(h5);
      feedbackBox.append(icon, info);

      if (hintBox) {
        hintBox.hidden = false;
        hintBox.classList.remove('hidden');
      }

      // Mascot tilts head with glowing lightbulb
      setMascotMood('hint');

    } else {
      // TẦNG 3 (Từ lần 3 trở đi): Mở lời giải từng bước, mở nút CÂU TIẾP THEO (Chống Soft-Lock!)
      feedbackBox.className = 'p-5 rounded-2xl text-sm font-bold flex items-start gap-3 bg-amber-50 border-2 border-amber-400 text-amber-950 pop-anim';
      const icon = document.createElement('span');
      icon.className = 'text-3xl shrink-0';
      icon.textContent = '🎓';
      const info = document.createElement('div');
      const h5 = document.createElement('h5');
      h5.className = 'text-base font-black text-amber-900';
      h5.textContent = result.message;
      info.appendChild(h5);
      feedbackBox.append(icon, info);

      if (solutionBox && solutionText) {
        solutionBox.hidden = false;
        solutionBox.classList.remove('hidden');
        solutionText.textContent = `[Đáp án: ${result.correctAnswer}] • Hướng dẫn: ${result.hint}`;
      }

      // Unlock Next Question Button so child is NOT trapped!
      if (btnNext) {
        btnNext.disabled = false;
        btnNext.className = 'px-8 py-4 bg-emerald-500 text-white font-black rounded-2xl text-base clay-btn flex items-center justify-center gap-2 cursor-pointer shadow-md';
      }

      if (btnCheck) {
        btnCheck.hidden = true;
        btnCheck.classList.add('hidden');
      }

      if (statusBadge) {
        statusBadge.textContent = 'Đã xem hướng dẫn giải';
        statusBadge.className = 'text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300';
      }
    }
  }
}

/**
 * Handle visual selection of choice option
 * @param {HTMLElement} btn
 */
export function highlightSelectedChoice(btn) {
  document.querySelectorAll('.option-item:not([disabled])').forEach(b => {
    b.classList.remove('border-[#62C9F3]', 'bg-sky-50', 'ring-2', 'ring-[#62C9F3]/30');
    const dot = b.querySelector('.indicator-dot');
    if (dot) dot.textContent = '';
  });

  btn.classList.add('border-[#62C9F3]', 'bg-sky-50', 'ring-2', 'ring-[#62C9F3]/30');
  const dot = btn.querySelector('.indicator-dot');
  if (dot) dot.textContent = '●';
}

/**
 * ========================================================
 * PARENT & TEACHER PORTAL & ADULT GATE RENDERERS
 * ========================================================
 */

/**
 * Render Parental Math Challenge Gate Modal
 * @param {object} challenge { prompt: string }
 */
export function renderParentalGate(challenge) {
  const modal = document.getElementById('modal-parental-gate');
  const promptEl = document.getElementById('gate-math-prompt');
  const inputEl = document.getElementById('gate-answer-input');
  const errorEl = document.getElementById('gate-error-message');

  if (!modal) return;

  if (promptEl) promptEl.textContent = challenge.prompt;
  if (inputEl) {
    inputEl.value = '';
    setTimeout(() => inputEl.focus(), 150);
  }
  if (errorEl) {
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
  }

  modal.hidden = false;
  modal.classList.remove('hidden');
}

/**
 * Close Parental Math Challenge Gate Modal
 */
export function closeParentalGate() {
  const modal = document.getElementById('modal-parental-gate');
  if (modal) {
    modal.hidden = true;
    modal.classList.add('hidden');
  }
}

/**
 * Display error message in Parental Gate
 * @param {string} msg
 */
export function showParentalGateError(msg) {
  const errorEl = document.getElementById('gate-error-message');
  if (errorEl) {
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
  }
}

/**
 * Render Parent & Teacher Portal Modal & Printable Report
 * @param {object} reportData
 * @param {number} activeGrade
 */
export function renderParentPortal(reportData, activeGrade = 3) {
  const modal = document.getElementById('modal-parent-portal');
  if (!modal || !reportData) return;

  // 1. Grade Switcher Highlight
  document.querySelectorAll('.report-grade-btn').forEach(btn => {
    const g = Number(btn.dataset.grade);
    if (g === activeGrade) {
      btn.className = 'report-grade-btn px-3 py-1.5 rounded-xl font-black text-xs transition bg-[#FFC85A] text-slate-900 shadow-2xs';
    } else {
      btn.className = 'report-grade-btn px-3 py-1.5 rounded-xl font-bold text-xs transition bg-white text-slate-600 hover:text-slate-900 border border-slate-200';
    }
  });

  // 2. Report Meta Info
  const metaEl = document.getElementById('report-meta-info');
  if (metaEl) {
    const studentLabel = reportData.studentName
      ? `${reportData.studentName} (Khối Lớp ${activeGrade})`
      : `Khối Lớp ${activeGrade}`;
    metaEl.textContent = `Học sinh: ${studentLabel} • Ngày lập: ${reportData.reportDate}`;
  }

  const statusEl = document.getElementById('report-overall-status');
  if (statusEl) {
    const isGood = reportData.overallRate >= 60 || reportData.totalAnswered >= 10;
    statusEl.textContent = isGood ? '✓ Đang học tập tích cực' : '🌱 Cần rèn luyện thêm';
    statusEl.className = isGood 
      ? 'inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-black text-xs border border-emerald-300'
      : 'inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs border border-amber-300';
  }

  // 3. 4 KPI Summary Cards
  const kpiBox = document.getElementById('report-kpi-container');
  if (kpiBox) {
    kpiBox.replaceChildren();

    const kpiItems = [
      { label: 'Tổng số câu đã làm', val: `${reportData.totalAnswered} câu`, icon: '📝', bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-950' },
      { label: 'Tỷ lệ đúng lần đầu', val: `${reportData.firstTryRate}%`, icon: '🎯', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-950' },
      { label: 'Tổng sao tích lũy', val: `${reportData.stars} ⭐`, icon: '⭐', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-950' },
      { label: 'Chuỗi ngày học', val: `${reportData.streakDays} ngày`, icon: '🔥', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-950' }
    ];

    const frag = document.createDocumentFragment();
    kpiItems.forEach(item => {
      const card = document.createElement('div');
      card.className = `p-4 rounded-2xl ${item.bg} border ${item.border} text-center space-y-1`;
      card.innerHTML = `
        <span class="text-2xl block">${item.icon}</span>
        <span class="text-xs font-bold text-slate-500 block">${item.label}</span>
        <span class="text-xl font-black ${item.text} block">${item.val}</span>
      `;
      frag.appendChild(card);
    });
    kpiBox.appendChild(frag);
  }

  // 4. Subjects Table
  const tableBody = document.getElementById('report-subjects-table-body');
  if (tableBody) {
    tableBody.replaceChildren();
    const subList = [
      { key: 'toan', name: 'Toán Học 3' },
      { key: 'tieng-viet', name: 'Tiếng Việt 3' },
      { key: 'tieng-anh', name: 'Tiếng Anh 3' }
    ];

    const frag = document.createDocumentFragment();
    subList.forEach(s => {
      const subData = (reportData.bySubject && reportData.bySubject[s.key]) || { total: 0, correct: 0, rate: 0 };
      const tr = document.createElement('tr');
      tr.className = 'hover:bg-slate-50/50';

      let comment = 'Chưa làm bài tập';
      if (subData.total > 0) {
        if (subData.rate >= 80) comment = 'Nắm vững kiến thức, phản xạ nhanh';
        else if (subData.rate >= 50) comment = 'Đạt chuẩn cơ bản, nên ôn lại câu sai';
        else comment = 'Cần luyện thêm với gợi ý từng bước';
      }

      tr.innerHTML = `
        <td class="p-3 font-bold">${s.name.replace('3', String(activeGrade))}</td>
        <td class="p-3 text-center">${subData.total}</td>
        <td class="p-3 text-center text-emerald-700 font-bold">${subData.correct}</td>
        <td class="p-3 text-center font-black ${subData.rate >= 70 ? 'text-emerald-700' : 'text-amber-700'}">${subData.rate}%</td>
        <td class="p-3 text-xs text-slate-600">${comment}</td>
      `;
      frag.appendChild(tr);
    });
    tableBody.appendChild(frag);
  }

  // 5. Skills Diagnostics
  const masteredList = document.getElementById('report-mastered-skills');
  if (masteredList) {
    masteredList.replaceChildren();
    const frag = document.createDocumentFragment();
    const list = reportData.masteredSkills || [];
    if (list.length === 0) {
      const li = document.createElement('li');
      li.className = 'text-xs text-slate-400 italic font-medium';
      li.textContent = 'Chưa có đủ dữ liệu bài tập hoàn thành xuất sắc.';
      frag.appendChild(li);
    } else {
      list.forEach(item => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2';
        li.innerHTML = `<span class="text-emerald-600 font-black">✓</span> <span>${item.subject}: ${item.title}</span>`;
        frag.appendChild(li);
      });
    }
    masteredList.appendChild(frag);
  }

  const reviewList = document.getElementById('report-review-skills');
  if (reviewList) {
    reviewList.replaceChildren();
    const frag = document.createDocumentFragment();
    const list = reportData.needsReviewSkills || [];
    if (list.length === 0) {
      const li = document.createElement('li');
      li.className = 'text-xs text-emerald-700 font-bold';
      li.textContent = '🎉 Tuyệt vời! Học sinh đã nắm vững tất cả các kỹ năng đã học!';
      frag.appendChild(li);
    } else {
      list.forEach(item => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2';
        li.innerHTML = `<span class="text-amber-600 font-black">!</span> <span>${item.subject}: ${item.title}</span>`;
        frag.appendChild(li);
      });
    }
    reviewList.appendChild(frag);
  }

  modal.hidden = false;
  modal.classList.remove('hidden');
}

/**
 * Close Parent & Teacher Portal Modal
 */
export function closeParentPortal() {
  const modal = document.getElementById('modal-parent-portal');
  if (modal) {
    modal.hidden = true;
    modal.classList.add('hidden');
  }
}

/**
 * Toggle Collapsible Custom JSON Panel
 * @param {boolean} forceState
 */
export function toggleCustomJsonPanel(forceState) {
  const panel = document.getElementById('custom-json-panel');
  if (!panel) return;

  const willShow = typeof forceState === 'boolean' ? forceState : panel.hidden;
  panel.hidden = !willShow;
  panel.classList.toggle('hidden', !willShow);
}

/**
 * Display Custom JSON Import Feedback
 * @param {object} result { success: boolean, message: string }
 */
export function renderCustomJsonFeedback(result) {
  const feedbackEl = document.getElementById('custom-json-feedback');
  if (!feedbackEl) return;

  feedbackEl.textContent = result.message;
  if (result.success) {
    feedbackEl.className = 'text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200';
  } else {
    feedbackEl.className = 'text-xs font-black text-rose-700 bg-rose-50 px-3 py-1 rounded-lg border border-rose-200';
  }
}

/**
 * Redraw Bezier Curves for Tap-to-Match on window resize
 * @param {object} session
 */
export function redrawMatchCurves(session) {
  const outer = document.getElementById('match-grid-container');
  if (outer && session && session.matchedPairs) {
    drawMatchBezierCurves(outer, session);
  }
}
