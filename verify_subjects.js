// verify_subjects.js
const fs = require('fs');
const code = fs.readFileSync('app.js', 'utf8');

// Mock browser environment
let renderedPrompt = '';
let renderedTag = '';
let renderedBook = '';

global.window = { addEventListener: () => {}, scrollTo: () => {} };
global.document = {
  getElementById: (id) => ({
    id,
    innerText: '',
    innerHTML: '',
    classList: { add(){}, remove(){} },
    appendChild(){},
    set innerText(val) {
      if (id === 'ex-prompt') renderedPrompt = val;
      if (id === 'ex-tag') renderedTag = val;
    },
    get innerText() { return ''; }
  }),
  createElement: (tag) => ({
    tagName: tag,
    className: '',
    innerHTML: '',
    appendChild(){},
    setAttribute(){},
    dataset: {}
  }),
  querySelectorAll: () => []
};
global.navigateTo = () => {};

eval(code.replace('const appState =', 'global.appState ='));

console.log('=== VERIFYING SUBJECT ISOLATION FOR ALL 44 LESSONS ===');

let errorCount = 0;

for (const grade of [3, 4, 5]) {
  appState.studentGrade = grade;
  const cur = appState.gradeCurriculum[grade];
  
  for (const [subjKey, subj] of Object.entries(cur)) {
    if (!subj.lessons) continue;

    for (const les of subj.lessons) {
      // Simulate launching exercise room
      startExerciseRoom(les.id);
      const ex = appState.exerciseEngine;
      const q = ex.questions[0];

      if (!q) {
        console.error(`[FAIL] No question loaded for ${les.id}!`);
        errorCount++;
        continue;
      }

      // Check subject alignment
      if (subjKey === 'tieng-viet') {
        const isMathTag = q.tag && (q.tag.includes('Toán') || q.tag.includes('Math'));
        const isChickenPrompt = q.prompt && (q.prompt.includes('gà trống') || q.prompt.includes('trang trại'));
        if (isMathTag || isChickenPrompt) {
          console.error(`[ERROR] Tiếng Việt lesson ${les.id} loaded MATH question! Prompt: ${q.prompt}`);
          errorCount++;
        } else {
          console.log(`[PASS] Tiếng Việt [Grade ${grade}] ${les.id} -> "${q.prompt.substring(0, 50)}..." [${q.tag}]`);
        }
      } else if (subjKey === 'toan') {
        const isVietTag = q.tag && (q.tag.includes('Tiếng Việt') || q.tag.includes('Chính tả'));
        if (isVietTag) {
          console.error(`[ERROR] Toán lesson ${les.id} loaded Tiếng Việt question! Prompt: ${q.prompt}`);
          errorCount++;
        } else {
          console.log(`[PASS] Toán [Grade ${grade}] ${les.id} -> "${q.prompt.substring(0, 50)}..." [${q.tag}]`);
        }
      } else if (subjKey === 'tieng-anh') {
        const isMathTag = q.tag && (q.tag.includes('Toán') && !q.tag.includes('Tiếng Anh'));
        if (isMathTag) {
          console.error(`[ERROR] Tiếng Anh lesson ${les.id} loaded Toán question! Prompt: ${q.prompt}`);
          errorCount++;
        } else {
          console.log(`[PASS] Tiếng Anh [Grade ${grade}] ${les.id} -> "${q.prompt.substring(0, 50)}..." [${q.tag}]`);
        }
      }
    }
  }
}

// Test Fallback Behavior: what if an unknown lesson ID is passed?
console.log('\n=== TESTING FALLBACK SAFETY ===');
startExerciseRoom('tv-unknown-test');
if (appState.exerciseEngine.questions[0].tag.includes('Tiếng Việt')) {
  console.log('[PASS] Fallback for tv-unknown-test loaded Tiếng Việt question safely!');
} else {
  console.error('[FAIL] Fallback for tv-unknown-test loaded WRONG subject:', appState.exerciseEngine.questions[0].tag);
  errorCount++;
}

startExerciseRoom('eng-unknown-test');
if (appState.exerciseEngine.questions[0].tag.includes('Tiếng Anh')) {
  console.log('[PASS] Fallback for eng-unknown-test loaded Tiếng Anh question safely!');
} else {
  console.error('[FAIL] Fallback for eng-unknown-test loaded WRONG subject:', appState.exerciseEngine.questions[0].tag);
  errorCount++;
}

console.log('\nTotal Errors:', errorCount);
if (errorCount === 0) {
  console.log('===> ALL TESTS PASSED! ZERO SUBJECT MIXING! <===');
}
