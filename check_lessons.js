const fs = require('fs');
const code = fs.readFileSync('app.js', 'utf8');

global.window = { addEventListener: () => {} };
global.document = {
    getElementById: () => ({ innerText: '', innerHTML: '', classList: { add(){}, remove(){} }, appendChild(){} }),
    querySelectorAll: () => []
};

eval(code.replace('const appState =', 'global.appState ='));

console.log('--- CHECKING ALL LESSONS IN CURRICULUM ---');
let missingCount = 0;
for (const grade of [3, 4, 5]) {
    const cur = appState.gradeCurriculum[grade];
    for (const [subjKey, subj] of Object.entries(cur)) {
        if (subj.lessons) {
            for (const les of subj.lessons) {
                const hasQ = !!appState.questionBank[les.id];
                if (!hasQ) {
                    missingCount++;
                    console.log(`[MISSING] Grade ${grade} [${subjKey}] lesson ${les.id} ('${les.title}') status=${les.status}`);
                } else {
                    console.log(`[OK] Grade ${grade} [${subjKey}] lesson ${les.id} questions=${appState.questionBank[les.id].length}`);
                }
            }
        }
    }
}
console.log('Total missing question bank entries:', missingCount);
