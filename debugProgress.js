import { db } from "./src/firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";

const userId = "BGRuxc459ePrdPLSThAO5HPF4wj2";

async function debugProgress() {
  console.log("=== course_progress ===");
  const cpSnap = await getDocs(query(collection(db, "course_progress"), where("userId", "==", userId)));
  cpSnap.docs.forEach(d => {
    console.log(`Doc ID: ${d.id}`);
    console.log(JSON.stringify(d.data(), null, 2));
    console.log("---");
  });

  console.log("=== practice_results ===");
  const prSnap = await getDocs(query(collection(db, "practice_results"), where("userId", "==", userId)));
  prSnap.docs.forEach(d => {
    console.log(`Doc ID: ${d.id}`);
    console.log(JSON.stringify(d.data(), null, 2));
    console.log("---");
  });
}

debugProgress().catch(console.error);
