import { db } from "./src/firebase.js";
import { doc, getDoc } from "firebase/firestore";

const ids = [
  'sql_select_where_7',
  'sql_select_where_8',
  'sql_select_where_9',
  'sql_joins_7',
  'sql_joins_8',
  'sql_joins_9',
  'sql_norm_7',
  'sql_norm_8',
  'sql_norm_9',
  'sql_opt_7',
  'sql_opt_8',
  'sql_opt_9',
];

async function fetchAndPrint() {
  console.log('Reading specified SQL visual questions from Firestore...');

  for (const id of ids) {
    try {
      const ref = doc(db, 'questions', id);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        console.log('---');
        console.log('id:', id);
        console.log('NOT FOUND in Firestore');
        continue;
      }

      const data = snap.data();

      console.log('---');
      console.log('id:', id);
      console.log('question:', data.question || data.questionText || '');
      console.log('options:', JSON.stringify(data.options || []));
      console.log('correctAnswer:', data.correctAnswer || '');
      console.log('format:', data.format || '');
      console.log('imageUrl:', data.imageUrl || '');
    } catch (err) {
      console.error('Error reading document', id, err);
    }
  }

  console.log('\nDone.');
}

fetchAndPrint().catch((err) => {
  console.error('Script failed:', err);
  process.exit(1);
});
