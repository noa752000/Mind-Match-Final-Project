import { db } from "./src/firebase.js";
import { doc, updateDoc } from "firebase/firestore";

const imageUpdates = {
  linalg_matrices_7: "/question-images/LA-upper-triangular-matrix.png",
  linalg_matrices_8: "/question-images/LA-matrix-multiplication.png",
  linalg_matrices_9: "/question-images/LA-diagonal-matrix.png",

  linalg_vectors_7: "/question-images/LA-same-direction-vectors.png",
  linalg_vectors_8: "/question-images/LA-vector-parallelogram.png",
  linalg_vectors_9: "/question-images/LA-perpendicular-vectors.png",

  linalg_transformations_7: "/question-images/LA-linear-stretch.png",
  linalg_transformations_8: "/question-images/LA-x-axis-reflection.png",

  linalg_eigenvalues_7: "/question-images/LA-eigenvector-transform.png",
  linalg_eigenvalues_8: "/question-images/LA-eigenvector-transform.png",
  linalg_eigenvalues_9: "/question-images/LA-eigenvector-transform.png",
};

async function runUpdates() {
  console.log("Starting Linear Algebra visual imageUrl updates...");

  for (const [id, imageUrl] of Object.entries(imageUpdates)) {
    try {
      await updateDoc(doc(db, "questions", id), { imageUrl });
      console.log("Updated:", id);
    } catch (error) {
      console.error("Failed to update:", id, error);
    }
  }

  console.log("Linear Algebra visual imageUrl updates completed.");
}

runUpdates().catch((error) => {
  console.error("Script failed:", error);
  process.exit(1);
});
