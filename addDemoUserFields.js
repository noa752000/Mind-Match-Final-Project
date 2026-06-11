import { db } from "./src/firebase.js";
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";

function usernameFromEmail(email) {
  return email.split("@")[0].toLowerCase().replace(/[^a-z0-9._-]/g, "");
}

async function addDemoUserFields() {
  console.log("Adding username, isDemoUser, lastLoginAt to 50 demo users...");

  for (let i = 1; i <= 50; i += 1) {
    const userId = `user${String(i).padStart(3, "0")}`;
    const ref = doc(db, "users", userId);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      console.log(`Skipped ${userId}: not found`);
      continue;
    }

    const data = snap.data();
    const username = usernameFromEmail(data.email || "");

    await updateDoc(ref, {
      username,
      isDemoUser: true,
      lastLoginAt: Timestamp.now()
    });
    console.log(`Updated ${userId}: username=${username}`);
  }

  console.log("Done.");
}

addDemoUserFields().catch((error) => {
  console.error("Update failed:", error);
  process.exit(1);
});
