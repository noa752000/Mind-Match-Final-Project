import { db } from "./src/firebase.js";
import { doc, updateDoc } from "firebase/firestore";

const optionUpdates = {
  arch_7: { options: ["Layered", "Microservices", "MVC", "Monolithic"], imageUrl: "/question-images/SA-layered-architecture.png" },
  arch_8: { options: ["Microservices", "Monolithic", "Layered", "MVC"], imageUrl: "/question-images/SA-microservices-architecture.png" },
  arch_9: { question: "ב-Layered Architecture כל שכבה יכולה לגשת ישירות לכל שכבה אחרת.", correctAnswer: "לא נכון", imageUrl: "/question-images/SA-layered-architecture.png" },
  uml_7: { options: ["Class Diagram", "Use Case Diagram", "Sequence Diagram", "Activity Diagram"], correctAnswer: "Class Diagram", imageUrl: "/question-images/SA-class-diagram.png" },
  uml_8: { options: ["Use Case Diagram", "Class Diagram", "Activity Diagram", "Component Diagram"], correctAnswer: "Use Case Diagram", imageUrl: "/question-images/SA-use-case-diagram.png" },
  uml_9: { question: "Class diagram יכול להציג גם קשרים בין מחלקות.", correctAnswer: "נכון", imageUrl: "/question-images/SA-class-diagram.png" },
  req_7: { options: ["Use Case Diagram", "Class Diagram", "Sequence Diagram", "ERD"], correctAnswer: "Use Case Diagram", imageUrl: "/question-images/SA-use-case-diagram.png" },
  req_8: { options: ["Actor", "Use Case", "Class", "Component"], imageUrl: "/question-images/SA-use-case-diagram.png" },
  req_9: { question: "Actor בתרשים Use Case יכול לייצג גם מערכת חיצונית ולא רק אדם.", correctAnswer: "נכון", imageUrl: "/question-images/SA-use-case-diagram.png" },
  meth_7: { options: ["Agile", "Waterfall", "Spiral", "V-Model"], imageUrl: "/question-images/SA-methodologies-comparison.png" },
  meth_8: { options: ["Waterfall", "Agile", "Spiral", "Kanban"], imageUrl: "/question-images/SA-methodologies-comparison.png" },
  meth_9: { question: "ב-Agile כל דרישות המערכת חייבות להיות מוגדרות ומאושרות לפני תחילת הפיתוח.", correctAnswer: "לא נכון", imageUrl: "/question-images/SA-methodologies-comparison.png" }
};

async function runUpdates() {
  console.log("Starting Systems Analysis visual option updates...");

  for (const [id, updateFields] of Object.entries(optionUpdates)) {
    try {
      await updateDoc(doc(db, "questions", id), updateFields);
      console.log("Updated fields for:", id);
    } catch (error) {
      console.error("Failed to update fields for:", id, error);
    }
  }

  console.log("Systems Analysis visual option updates completed.");
}

runUpdates().catch((error) => {
  console.error("Script failed:", error);
  process.exit(1);
});
