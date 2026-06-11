import { db } from "./src/firebase.js";
import { collection, getDocs } from "firebase/firestore";

async function debugAllProgress() {
  const snap = await getDocs(collection(db, "course_progress"));
  console.log(`Total course_progress docs: ${snap.size}`);
  snap.docs.forEach(d => {
    console.log(`Doc ID: ${d.id}`);
    console.log(JSON.stringify(d.data(), null, 2));
    console.log("---");
  });
}

debugAllProgress().catch(console.error);
