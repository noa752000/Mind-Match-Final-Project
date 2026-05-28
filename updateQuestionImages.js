import { db } from "./src/firebase.js";
import { doc, updateDoc } from "firebase/firestore";

const questionUpdates = [
  { id: "sql_select_where_7", imageUrl: "/question-images/sql_select_where.png" },
  { id: "sql_select_where_8", imageUrl: "/question-images/sql_select_where.png" },
  { id: "sql_select_where_9", imageUrl: "/question-images/sql_select_where.png" },
  { id: "sql_joins_7", imageUrl: "/question-images/sql_joins.png" },
  { id: "sql_joins_8", imageUrl: "/question-images/sql_joins.png" },
  { id: "sql_joins_9", imageUrl: "/question-images/sql_joins.png" },
  { id: "sql_norm_7", imageUrl: "/question-images/sql_normalization.png" },
  { id: "sql_norm_8", imageUrl: "/question-images/sql_normalization.png" },
  { id: "sql_norm_9", imageUrl: "/question-images/sql_normalization.png" },
  { id: "sql_opt_7", imageUrl: "/question-images/sql_select_where.png" },
  { id: "sql_opt_8", imageUrl: "/question-images/sql_select_where.png" },
  { id: "sql_opt_9", imageUrl: "/question-images/sql_select_where.png" },
];

async function runUpdates() {
  console.log("Updating SQL visual question images...");

  for (const { id, imageUrl } of questionUpdates) {
    const questionRef = doc(db, "questions", id);
    await updateDoc(questionRef, { imageUrl });
    console.log("Updated:", id);
  }

  console.log("All SQL visual question image updates completed.");
}

runUpdates().catch((error) => {
  console.error("Update failed:", error);
  process.exit(1);
});
