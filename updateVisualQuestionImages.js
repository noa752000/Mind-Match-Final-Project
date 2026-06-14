import { db } from "./src/firebase.js";
import { doc, updateDoc } from "firebase/firestore";

const questionUpdates = [
  // calculus1
  { id: "calc1_limits_7", imageUrl: "/question-images/calc1_limits_7.png" },
  { id: "calc1_limits_8", imageUrl: "/question-images/calc1_limits_8.png" },
  { id: "calc1_limits_9", imageUrl: "/question-images/calc1_limits_9.png" },
  { id: "calc1_derivatives_7", imageUrl: "/question-images/calc1_derivatives_7.png" },
  { id: "calc1_derivatives_8", imageUrl: "/question-images/calc1_derivatives_8.png" },
  { id: "calc1_derivatives_9", imageUrl: "/question-images/calc1_derivatives_9.png" },
  { id: "calc1_function_investigation_7", imageUrl: "/question-images/calc1_function_investigation_7.png" },
  { id: "calc1_function_investigation_8", imageUrl: "/question-images/calc1_function_investigation_8.png" },
  { id: "calc1_function_investigation_9", imageUrl: "/question-images/calc1_function_investigation_9.png" },
  { id: "calc1_integrals_7", imageUrl: "/question-images/calc1_integrals_7.png" },
  { id: "calc1_integrals_8", imageUrl: "/question-images/calc1_integrals_8.png" },
  { id: "calc1_integrals_9", imageUrl: "/question-images/calc1_integrals_9.png" },

  // cyber_security
  { id: "hash_7", imageUrl: "/question-images/hash_7.png" },
  { id: "hash_8", imageUrl: "/question-images/hash_8.png" },
  { id: "hash_9", imageUrl: "/question-images/hash_9.png" },
  { id: "asym_7", imageUrl: "/question-images/asym_7.png" },
  { id: "asym_8", imageUrl: "/question-images/asym_8.png" },
  { id: "asym_9", imageUrl: "/question-images/asym_9.png" },
  { id: "sym_7", imageUrl: "/question-images/sym_7.png" },
  { id: "sym_8", imageUrl: "/question-images/sym_8.png" },
  { id: "sym_9", imageUrl: "/question-images/sym_9.png" },
  { id: "net_7", imageUrl: "/question-images/net_7.png" },
  { id: "net_8", imageUrl: "/question-images/net_8.png" },
  { id: "net_9", imageUrl: "/question-images/net_9.png" },

  // information_systems_economics
  { id: "risk_7", imageUrl: "/question-images/risk_7.png" },
  { id: "risk_8", imageUrl: "/question-images/risk_8.png" },
  { id: "risk_9", imageUrl: "/question-images/risk_9.png" },
  { id: "proj_7", imageUrl: "/question-images/proj_7.png" },
  { id: "proj_8", imageUrl: "/question-images/proj_8.png" },
  { id: "proj_9", imageUrl: "/question-images/proj_9.png" },
  { id: "roi_7", imageUrl: "/question-images/roi_7.png" },
  { id: "roi_8", imageUrl: "/question-images/roi_8.png" },
  { id: "roi_9", imageUrl: "/question-images/roi_9.png" },
  { id: "dig_7", imageUrl: "/question-images/dig_7.png" },
  { id: "dig_8", imageUrl: "/question-images/dig_8.png" },
  { id: "dig_9", imageUrl: "/question-images/dig_9.png" },

  // oop
  { id: "oop_classes_objects_7", imageUrl: "/question-images/oop_classes_objects_7.png" },
  { id: "oop_classes_objects_8", imageUrl: "/question-images/oop_classes_objects_8.png" },
  { id: "oop_classes_objects_9", imageUrl: "/question-images/oop_classes_objects_9.png" },
  { id: "oop_inheritance_7", imageUrl: "/question-images/oop_inheritance_7.png" },
  { id: "oop_inheritance_8", imageUrl: "/question-images/oop_inheritance_8.png" },
  { id: "oop_inheritance_9", imageUrl: "/question-images/oop_inheritance_9.png" },
  { id: "oop_polymorphism_7", imageUrl: "/question-images/oop_polymorphism_7.png" },
  { id: "oop_polymorphism_8", imageUrl: "/question-images/oop_polymorphism_8.png" },
  { id: "oop_polymorphism_9", imageUrl: "/question-images/oop_polymorphism_9.png" },
  { id: "oop_design_patterns_7", imageUrl: "/question-images/oop_design_patterns_7.png" },
  { id: "oop_design_patterns_8", imageUrl: "/question-images/oop_design_patterns_8.png" },
  { id: "oop_design_patterns_9", imageUrl: "/question-images/oop_design_patterns_9.png" },
];

async function runUpdates() {
  console.log("Updating visual question images in Firestore...");

  for (const { id, imageUrl } of questionUpdates) {
    const questionRef = doc(db, "questions", id);
    await updateDoc(questionRef, { imageUrl });
    console.log("Updated:", id);
  }

  console.log("All visual question image updates completed.");
}

runUpdates().catch((error) => {
  console.error("Update failed:", error);
  process.exit(1);
});
