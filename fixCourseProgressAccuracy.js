import { db } from "./src/firebase.js";
import { collection, getDocs, query, where, doc, setDoc } from "firebase/firestore";

// Maps course catalog IDs (course_progress.courseId) to the courseId values
// used on the question documents themselves, where they differ.
const QUESTION_DATA_COURSE_ID = {
  html: "html_fundamentals",
  "linear-algebra": "linear_algebra",
  "mis-economics": "information_systems_economics",
};

const FALLBACK_TOTAL_QUESTIONS = {
  calculus1: 36,
  "linear-algebra": 36,
  oop: 36,
  html: 36,
  sql: 24,
  systems_analysis: 36,
  cyber_security: 36,
  "mis-economics": 36,
};

async function fixCourseProgressAccuracy() {
  const progressSnap = await getDocs(collection(db, "course_progress"));
  const docs = progressSnap.docs;

  const courseIds = [...new Set(docs.map((d) => d.data().courseId))];
  const totalQuestionsMap = {};

  for (const courseId of courseIds) {
    const questionDataCourseId = QUESTION_DATA_COURSE_ID[courseId] || courseId;
    try {
      const snap = await getDocs(
        query(collection(db, "questions"), where("courseId", "==", questionDataCourseId))
      );
      totalQuestionsMap[courseId] = snap.size > 0 ? snap.size : (FALLBACK_TOTAL_QUESTIONS[courseId] ?? 36);
    } catch (e) {
      console.warn(`Failed to fetch question count for ${courseId}, using fallback:`, e.message);
      totalQuestionsMap[courseId] = FALLBACK_TOTAL_QUESTIONS[courseId] ?? 36;
    }
    console.log(`Course "${courseId}" -> total questions = ${totalQuestionsMap[courseId]}`);
  }

  let updated = 0;
  for (const d of docs) {
    const data = d.data();
    const total = totalQuestionsMap[data.courseId] ?? FALLBACK_TOTAL_QUESTIONS[data.courseId] ?? 36;
    const newAccuracy = total > 0 ? Math.round((data.correctAnswers / total) * 100) : 0;

    if (newAccuracy === data.accuracy) {
      console.log(`${d.id}: accuracy already ${data.accuracy}%, skipping`);
      continue;
    }

    await setDoc(doc(db, "course_progress", d.id), { accuracy: newAccuracy }, { merge: true });
    console.log(`${d.id}: accuracy ${data.accuracy}% -> ${newAccuracy}% (correctAnswers=${data.correctAnswers}, total=${total})`);
    updated++;
  }

  console.log(`Done. Updated ${updated} of ${docs.length} course_progress docs.`);
}

fixCourseProgressAccuracy().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
