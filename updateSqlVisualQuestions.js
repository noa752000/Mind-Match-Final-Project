import { db } from "./src/firebase.js";
import { doc, updateDoc } from "firebase/firestore";

const updates = {
  sql_select_where_7: "בהתבסס על הטבלה בתמונה, איזו שאילתה תחזיר רק את עמודת השמות?",
  sql_select_where_8: "בהתבסס על הטבלה בתמונה, איזו שאילתה משתמשת בתנאי WHERE לסינון לפי גיל?",
  sql_select_where_9: "בהתבסס על הטבלה בתמונה, ניתן לבחור רק חלק מהשורות בעזרת WHERE.",

  sql_joins_7: "בהתבסס על שתי הטבלאות בתמונה, איזו פקודת SQL משמשת לחיבור בין טבלאות?",
  sql_joins_8: "בהתבסס על שתי הטבלאות בתמונה, מה נדרש כדי להגדיר את תנאי החיבור ב-JOIN?",
  sql_joins_9: "בהתבסס על שתי הטבלאות בתמונה, JOIN דורש תנאי חיבור בין הטבלאות.",

  sql_norm_7: "בהתבסס על התמונה, איזו אפשרות מתארת טבלה מנורמלת?",
  sql_norm_8: "בהתבסס על הטבלה הלא מנורמלת בתמונה, איזו בעיה ניתן לראות?",
  sql_norm_9: "בהתבסס על התמונה, נרמול טבלאות מסייע להפחתת כפילויות.",

  sql_opt_7: "בהתבסס על הטבלה בתמונה, מה יכול להאיץ חיפוש או שאילתה?",
  sql_opt_8: "בהתבסס על הטבלה בתמונה, איזו שאילתה עלולה להיות פחות יעילה כי היא מחזירה את כל העמודות?",
  sql_opt_9: "בהתבסס על הטבלה בתמונה, שימוש ב-Index יכול לשפר ביצועי שאילתות.",
};

async function run() {
  console.log('Starting SQL visual question text updates...');

  for (const [id, text] of Object.entries(updates)) {
    const ref = doc(db, 'questions', id);
    try {
      await updateDoc(ref, { question: text });
      console.log('Updated:', id);
    } catch (err) {
      console.error('Failed to update:', id, err.message || err);
    }
  }

  console.log('Done updating SQL visual question texts.');
}

run().catch((err) => {
  console.error('Script failed:', err);
  process.exit(1);
});
