import { db } from "./src/firebase.js";
import { doc, updateDoc } from "firebase/firestore";

const imageUpdates = {
  html_accessibility_7: "/question-images/accessibility-example.png",
  html_accessibility_8: "/question-images/contrast-example.png",
  html_accessibility_9: "/question-images/accessibility-example.png",

  html_forms_7: "/question-images/form-example.png",
  html_forms_8: "/question-images/radio-vs-checkbox.png",
  html_forms_9: "/question-images/radio-vs-checkbox.png",

  html_semantics_7: "/question-images/semantic-layout.png",
  html_semantics_8: "/question-images/semantic-layout.png",
  html_semantics_9: "/question-images/semantic-layout.png",

  html_apis_7: "/question-images/html-apis-example.png",
  html_apis_8: "/question-images/html-apis-example.png",
  html_apis_9: "/question-images/html-apis-example.png",
};

async function runUpdates() {
  console.log("Starting HTML visual imageUrl updates...");

  for (const [id, imageUrl] of Object.entries(imageUpdates)) {
    try {
      await updateDoc(doc(db, "questions", id), { imageUrl });
      console.log("Updated:", id);
    } catch (error) {
      console.error("Failed to update:", id, error);
    }
  }

  console.log("HTML visual imageUrl updates completed.");
}

runUpdates().catch((error) => {
  console.error("Script failed:", error);
  process.exit(1);
});
