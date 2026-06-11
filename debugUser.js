import { db } from "./src/firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";

async function debugUser() {
  const snap = await getDocs(collection(db, "users"));
  const matches = snap.docs.filter(d => {
    const data = d.data();
    return (data.fullName || "").toLowerCase().includes("nofar")
      || (data.email || "").toLowerCase().includes("nofar")
      || (data.email || "").toLowerCase().includes("tal2017");
  });

  if (matches.length === 0) {
    console.log("No matching user found.");
    return;
  }

  for (const m of matches) {
    console.log(`Doc ID: ${m.id}`);
    console.log(JSON.stringify(m.data(), null, 2));
    console.log("---");
  }
}

debugUser().catch(console.error);
