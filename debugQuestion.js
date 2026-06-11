import { db } from "./src/firebase.js";
import { doc, getDoc } from "firebase/firestore";

async function debugQuestion() {
  const ref = doc(db, "questions", "sql_joins_9");
  const snap = await getDoc(ref);
  if (snap.exists()) {
    console.log(JSON.stringify(snap.data(), null, 2));
  } else {
    console.log("Not found in questions collection");
  }
}

debugQuestion().catch(console.error);
