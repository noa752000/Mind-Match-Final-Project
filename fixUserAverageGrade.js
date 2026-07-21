import { db } from "./src/firebase.js";
import { collection, getDocs, getDoc, query, where, doc, setDoc } from "firebase/firestore";

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
  sql: 36,
  systems_analysis: 36,
  cyber_security: 36,
  "mis-economics": 36,
};

function studentLevelFor(averageGrade) {
  if (averageGrade < 60) return "beginner";
  if (averageGrade <= 79) return "intermediate";
  return "advanced";
}

async function fixUserAverageGrade() {
  const progressSnap = await getDocs(collection(db, "course_progress"));
  const docs = progressSnap.docs.map((d) => d.data());

  const courseIds = [...new Set(docs.map((d) => d.courseId))];
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
  }

  const byUser = new Map();
  for (const d of docs) {
    if (!byUser.has(d.userId)) byUser.set(d.userId, []);
    byUser.get(d.userId).push(d);
  }

  let updated = 0;
  for (const [userId, userDocs] of byUser) {
    const userSnap = await getDoc(doc(db, "users", userId));
    const selectedCourses = userSnap.data()?.selectedCourses || [];

    const courseAccuracies = userDocs
      .filter((d) => selectedCourses.includes(d.courseId) && (d.totalAnswers || 0) > 0)
      .map((d) => {
        const total = totalQuestionsMap[d.courseId] ?? FALLBACK_TOTAL_QUESTIONS[d.courseId] ?? 36;
        return total > 0 ? Math.round((d.correctAnswers / total) * 100) : 0;
      });

    const newAverageGrade = courseAccuracies.length > 0
      ? Math.round(courseAccuracies.reduce((s, a) => s + a, 0) / courseAccuracies.length)
      : 0;
    const newStudentLevel = studentLevelFor(newAverageGrade);

    await setDoc(doc(db, "users", userId), { averageGrade: newAverageGrade, studentLevel: newStudentLevel }, { merge: true });
    console.log(`${userId}: selectedCourses=[${selectedCourses.join(', ')}] courseAccuracies=[${courseAccuracies.join(', ')}] -> averageGrade=${newAverageGrade}% (${newStudentLevel})`);
    updated++;
  }

  console.log(`Done. Updated ${updated} user docs.`);
}

fixUserAverageGrade().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
