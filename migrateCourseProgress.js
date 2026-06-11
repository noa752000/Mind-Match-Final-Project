import { db } from "./src/firebase.js";
import { collection, getDocs, doc, setDoc, Timestamp } from "firebase/firestore";

async function migrateCourseProgress() {
  const resultsSnap = await getDocs(collection(db, "practice_results"));

  const groups = new Map();

  resultsSnap.docs.forEach((d) => {
    const data = d.data();
    const key = `${data.userId}_${data.courseId}`;
    if (!groups.has(key)) {
      groups.set(key, { userId: data.userId, courseId: data.courseId, results: [] });
    }
    groups.get(key).results.push(data);
  });

  for (const [key, group] of groups) {
    const { userId, courseId, results } = group;

    let totalAnswers = 0;
    let correctAnswers = 0;
    let knowledgeTotal = 0;
    let knowledgeCorrect = 0;
    let analysisTotal = 0;
    let analysisCorrect = 0;
    let visualTotal = 0;
    let visualCorrect = 0;
    let totalSeconds = 0;
    let lastAnsweredAt = null;

    for (const r of results) {
      totalAnswers += 1;
      if (r.isCorrect) correctAnswers += 1;
      totalSeconds += r.timeSpentSeconds || 0;

      if (r.learningType === "knowledge") {
        knowledgeTotal += 1;
        if (r.isCorrect) knowledgeCorrect += 1;
      } else if (r.learningType === "analysis") {
        analysisTotal += 1;
        if (r.isCorrect) analysisCorrect += 1;
      } else if (r.learningType === "visual") {
        visualTotal += 1;
        if (r.isCorrect) visualCorrect += 1;
      }

      if (r.answeredAt && (!lastAnsweredAt || r.answeredAt.seconds > lastAnsweredAt.seconds)) {
        lastAnsweredAt = r.answeredAt;
      }
    }

    const wrongAnswers = totalAnswers - correctAnswers;
    const accuracy = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;
    const practicedMinutes = Math.round(totalSeconds / 60);

    await setDoc(doc(db, "course_progress", key), {
      userId,
      courseId,
      totalAnswers,
      correctAnswers,
      wrongAnswers,
      accuracy,
      knowledgeTotal,
      knowledgeCorrect,
      analysisTotal,
      analysisCorrect,
      visualTotal,
      visualCorrect,
      practicedMinutes,
      lastPracticedAt: lastAnsweredAt || Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    console.log(`Updated course_progress/${key}: total=${totalAnswers}, correct=${correctAnswers}, accuracy=${accuracy}%, practicedMinutes=${practicedMinutes}`);
  }

  console.log(`Done. Migrated ${groups.size} course_progress docs.`);
}

migrateCourseProgress().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
