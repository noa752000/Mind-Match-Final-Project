import { db } from "./src/firebase.js";
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { calculus1Questions } from "./src/dataQ/calculus1_questions.js";
import { linearAlgebraQuestions } from "./src/dataQ/linearAlgebra_questions.js";
import { oopQuestions } from "./src/dataQ/oop_questions.js";
import { htmlQuestions } from "./src/dataQ/html_questions.js";
import { sqlQuestions } from "./src/dataQ/sql_questions.js";
import { systemDesignQuestions } from "./src/dataQ/systemDesign_questions.js";
import { securityQuestions } from "./src/dataQ/security_questions.js";
import { economicsQuestions } from "./src/dataQ/economics_questions.js";

const allLocalQuestions = [
  ...calculus1Questions,
  ...linearAlgebraQuestions,
  ...oopQuestions,
  ...htmlQuestions,
  ...sqlQuestions,
  ...systemDesignQuestions,
  ...securityQuestions,
  ...economicsQuestions
];

const localQuestionMap = new Map(allLocalQuestions.map((q) => [q.id, q]));

async function getQuestionMeta(questionId) {
  const local = localQuestionMap.get(questionId);
  if (local) {
    return { difficulty: local.difficulty || 1, learningType: local.learningType || "concept" };
  }

  const snap = await getDoc(doc(db, "questions", questionId));
  if (snap.exists()) {
    const data = snap.data();
    return { difficulty: data.difficulty || 1, learningType: data.learningType || "concept" };
  }

  return { difficulty: 1, learningType: "concept" };
}

async function migrateOldPracticeResults() {
  const snap = await getDocs(collection(db, "practice_results"));
  let migrated = 0;
  let skipped = 0;

  for (const docSnap of snap.docs) {
    const data = docSnap.data();

    if (data.learningType !== undefined && data.timeSpentSeconds !== undefined && data.answeredAt !== undefined) {
      skipped += 1;
      continue;
    }

    const { userId, courseId, questionId, isCorrect } = data;
    const newId = `${userId}_${questionId}`;
    const { difficulty, learningType } = await getQuestionMeta(questionId);
    const timeSpentSeconds = Math.round((data.timeSpent || 0) / 1000);
    const answeredAt = data.timestamp || Timestamp.now();

    const newData = {
      userId,
      courseId,
      questionId,
      isCorrect,
      difficulty,
      learningType,
      timeSpentSeconds,
      answeredAt
    };

    if (newId !== docSnap.id) {
      const existing = await getDoc(doc(db, "practice_results", newId));
      if (existing.exists()) {
        const existingAnsweredAt = existing.data().answeredAt;
        const keepExisting = existingAnsweredAt && answeredAt && existingAnsweredAt.seconds >= answeredAt.seconds;
        if (!keepExisting) {
          await setDoc(doc(db, "practice_results", newId), newData);
          console.log(`Migrated ${docSnap.id} -> ${newId} (overwrote older existing doc)`);
        } else {
          console.log(`Kept existing ${newId} (more recent), discarding ${docSnap.id}`);
        }
      } else {
        await setDoc(doc(db, "practice_results", newId), newData);
        console.log(`Migrated ${docSnap.id} -> ${newId}`);
      }
      await deleteDoc(doc(db, "practice_results", docSnap.id));
    } else {
      await setDoc(doc(db, "practice_results", newId), newData);
      console.log(`Updated ${newId} in place`);
    }

    migrated += 1;
  }

  console.log(`Done. Migrated ${migrated}, skipped ${skipped} (already up to date).`);
}

migrateOldPracticeResults().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
