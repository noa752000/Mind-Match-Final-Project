import { db } from "./src/firebase.js";
import { doc, setDoc } from "firebase/firestore";
import { sqlQuestions } from "./src/dataQ/sql_questions.js";
import { oopQuestions } from "./src/dataQ/oop_questions.js";
import { htmlQuestions } from "./src/dataQ/html_questions.js";
import { calculus1Questions } from "./src/dataQ/calculus1_questions.js";
import { linearAlgebraQuestions } from "./src/dataQ/linearAlgebra_questions.js";
import { systemDesignQuestions } from "./src/dataQ/systemDesign_questions.js";
import { securityQuestions } from "./src/dataQ/security_questions.js";
import { economicsQuestions } from "./src/dataQ/economics_questions.js";

const allQuestions = [
  ...sqlQuestions,
  ...oopQuestions,
  ...htmlQuestions,
  ...calculus1Questions,
  ...linearAlgebraQuestions,
  ...systemDesignQuestions,
  ...securityQuestions,
  ...economicsQuestions
];

async function uploadQuestions() {
  console.log("Uploading questions...");

  for (const question of allQuestions) {
    await setDoc(doc(db, "questions", question.id), question);
    console.log("Uploaded:", question.id);
  }

  console.log(`Finished uploading ${allQuestions.length} questions.`);
}

uploadQuestions().catch((error) => {
  console.error("Upload failed:", error);
  process.exit(1);
});
