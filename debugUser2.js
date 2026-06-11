import { db } from "./src/firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";

const userId = "i5Yei2h3NehbEvmWFQoWgMC9gpH2";

async function debugUser2() {
  console.log("=== users doc ===");
  const usersSnap = await getDocs(collection(db, "users"));
  const userDoc = usersSnap.docs.find(d => d.id === userId);
  if (userDoc) console.log(JSON.stringify(userDoc.data(), null, 2));

  console.log("=== practice_results ===");
  const prSnap = await getDocs(query(collection(db, "practice_results"), where("userId", "==", userId)));
  prSnap.docs.forEach(d => {
    console.log(`Doc ID: ${d.id}`);
    console.log(JSON.stringify(d.data(), null, 2));
    console.log("---");
  });
}

debugUser2().catch(console.error);
