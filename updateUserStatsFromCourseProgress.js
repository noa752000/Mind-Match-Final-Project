import { db } from "./src/firebase.js";
import { collection, getDocs, doc, setDoc, Timestamp } from "firebase/firestore";

async function updateUserStatsFromCourseProgress() {
  const progressSnap = await getDocs(collection(db, "course_progress"));

  const groups = new Map();

  progressSnap.docs.forEach((d) => {
    const data = d.data();
    const userId = data.userId;
    if (!groups.has(userId)) {
      groups.set(userId, []);
    }
    groups.get(userId).push(data);
  });

  for (const [userId, docsForUser] of groups) {
    let totalAnswers = 0;
    let correctAnswers = 0;
    let knowledgeTotal = 0;
    let knowledgeCorrect = 0;
    let analysisTotal = 0;
    let analysisCorrect = 0;
    let visualTotal = 0;
    let visualCorrect = 0;
    let practicedMinutes = 0;
    let lastPracticedAt = null;

    for (const data of docsForUser) {
      totalAnswers += data.totalAnswers || 0;
      correctAnswers += data.correctAnswers || 0;
      knowledgeTotal += data.knowledgeTotal || 0;
      knowledgeCorrect += data.knowledgeCorrect || 0;
      analysisTotal += data.analysisTotal || 0;
      analysisCorrect += data.analysisCorrect || 0;
      visualTotal += data.visualTotal || 0;
      visualCorrect += data.visualCorrect || 0;
      practicedMinutes += data.practicedMinutes || 0;

      if (data.lastPracticedAt && (!lastPracticedAt || data.lastPracticedAt.seconds > lastPracticedAt.seconds)) {
        lastPracticedAt = data.lastPracticedAt;
      }
    }

    const averageGrade = totalAnswers > 0 ? Math.round((correctAnswers / totalAnswers) * 100) : 0;

    const accuracies = [
      { type: "knowledge", value: knowledgeTotal > 0 ? knowledgeCorrect / knowledgeTotal : -1 },
      { type: "analysis", value: analysisTotal > 0 ? analysisCorrect / analysisTotal : -1 },
      { type: "visual", value: visualTotal > 0 ? visualCorrect / visualTotal : -1 },
    ];
    const bestType = accuracies.reduce((best, curr) => (curr.value > best.value ? curr : best), accuracies[0]);
    const preferredLearningType = bestType.value >= 0 ? bestType.type : null;

    let studentLevel;
    if (averageGrade < 60) {
      studentLevel = "beginner";
    } else if (averageGrade <= 79) {
      studentLevel = "intermediate";
    } else {
      studentLevel = "advanced";
    }

    await setDoc(doc(db, "users", userId), {
      averageGrade,
      completedQuestions: totalAnswers,
      preferredLearningType,
      studentLevel,
      totalStudyMinutes: practicedMinutes,
      weeklyStudyMinutes: practicedMinutes,
      lastPracticedAt: lastPracticedAt || Timestamp.now(),
    }, { merge: true });

    console.log(`Updated users/${userId}: averageGrade=${averageGrade}, completedQuestions=${totalAnswers}, preferredLearningType=${preferredLearningType}, studentLevel=${studentLevel}, totalStudyMinutes=${practicedMinutes}`);
  }

  console.log(`Done. Updated stats for ${groups.size} users.`);
}

updateUserStatsFromCourseProgress().catch((error) => {
  console.error("Update failed:", error);
  process.exit(1);
});
