import { db } from "./src/firebase.js";
import { collection, getDocs } from "firebase/firestore";
import { sqlQuestions } from "./src/dataQ/sql_questions.js";
import { oopQuestions } from "./src/dataQ/oop_questions.js";
import { htmlQuestions } from "./src/dataQ/html_questions.js";
import { calculus1Questions } from "./src/dataQ/calculus1_questions.js";
import { linearAlgebraQuestions } from "./src/dataQ/linearAlgebra_questions.js";
import { systemDesignQuestions } from "./src/dataQ/systemDesign_questions.js";
import { securityQuestions } from "./src/dataQ/security_questions.js";
import { economicsQuestions } from "./src/dataQ/economics_questions.js";

const localQuestions = [
  ...sqlQuestions,
  ...oopQuestions,
  ...htmlQuestions,
  ...calculus1Questions,
  ...linearAlgebraQuestions,
  ...systemDesignQuestions,
  ...securityQuestions,
  ...economicsQuestions,
];

async function fetchFromFirestore() {
  try {
    const snapshot = await getDocs(collection(db, 'questions'));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Firestore read failed:', err.message || err);
    return null;
  }
}

function isVisual(q) {
  if (!q) return false;
  const lt = (q.learningType || '').toString().trim().toLowerCase();
  return lt === 'visual';
}

function printVisuals(list, source) {
  const visuals = list.filter(isVisual);
  console.log(`\nFound ${visuals.length} visual questions (source: ${source})\n`);
  visuals.forEach((q) => {
    console.log('---');
    console.log('id:', q.id);
    console.log('courseId:', q.courseId || '');
    console.log('subTopic:', q.subTopic || '');
    console.log('question:', q.question || q.questionText || '');
  });
  console.log('\n');
}

async function main() {
  console.log('Scanning for visual questions...');

  const firestoreList = await fetchFromFirestore();

  if (firestoreList) {
    printVisuals(firestoreList, 'firestore');
  } else {
    console.log('Falling back to local question files.');
    printVisuals(localQuestions, 'local-files');
  }
}

main().catch(err => {
  console.error('Script failed:', err);
  process.exit(1);
});
