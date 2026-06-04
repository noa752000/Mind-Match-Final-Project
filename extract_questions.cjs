const fs = require('fs');
const path = require('path');
const files = [
  'src/dataQ/calculus1_questions.js',
  'src/dataQ/html_questions.js',
  'src/dataQ/systemDesign_questions.js',
  'src/dataQ/sql_questions.js'
];
const targetCourses = new Set(['calculus1','html_fundamentals','systems_analysis','sql']);
for (const file of files) {
  const text = fs.readFileSync(path.join(process.cwd(), file), 'utf8');
  const m = text.match(/\[([\s\S]*)\]/);
  if (!m) continue;
  const inner = m[1];
  let depth = 0;
  let cur = '';
  let inStr = false;
  let strChar = '';
  let prev = '';
  for (const ch of inner) {
    cur += ch;
    if (inStr) {
      if (ch === strChar && prev !== '\\') {
        inStr = false;
      }
    } else {
      if (ch === '"' || ch === "'") {
        inStr = true;
        strChar = ch;
      } else if (ch === '{') {
        depth += 1;
      } else if (ch === '}') {
        depth -= 1;
        if (depth === 0) {
          const objText = cur.trim();
          cur = '';
          const obj = {};
          for (const line of objText.split(/\r?\n/).map(l => l.trim()).filter(Boolean)) {
            if (line.startsWith('//')) continue;
            const m2 = line.match(/^([a-zA-Z0-9_]+)\s*:\s*(.*?)(,?)$/);
            if (!m2) continue;
            const key = m2[1];
            let raw = m2[2].trim().replace(/,$/, '');
            if ((raw.startsWith('"') && raw.endsWith('"')) || (raw.startsWith("'") && raw.endsWith("'"))) {
              raw = raw.slice(1, -1);
            }
            if (['id','courseId','learningType','question'].includes(key)) {
              obj[key] = raw;
            }
          }
          if (obj.id && targetCourses.has(obj.courseId) && obj.learningType !== 'visual') {
            console.log(`${obj.id} | ${obj.learningType} | ${obj.question}`);
          }
        }
      }
    }
    prev = ch;
  }
}
