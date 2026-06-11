import { db } from "./src/firebase.js";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";

async function fixUsersCoursesField() {
  console.log("Renaming 'courses' -> 'selectedCourses' for 50 users...");

  for (let i = 1; i <= 50; i += 1) {
    const userId = `user${String(i).padStart(3, "0")}`;
    const ref = doc(db, "users", userId);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      console.log(`Skipped ${userId}: not found`);
      continue;
    }

    const data = snap.data();
    if (!Array.isArray(data.courses)) {
      console.log(`Skipped ${userId}: no 'courses' field`);
      continue;
    }

    await updateDoc(ref, {
      selectedCourses: data.courses,
      courses: deleteField()
    });
    console.log(`Updated ${userId}: selectedCourses = [${data.courses.join(", ")}]`);
  }

  console.log("Done.");
}

fixUsersCoursesField().catch((error) => {
  console.error("Update failed:", error);
  process.exit(1);
});
