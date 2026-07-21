import { db } from "./src/firebase.js";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const YEAR_LETTERS = ["א", "ב", "ג", "ד"];

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function academicYearForYear(year) {
  const letter = YEAR_LETTERS[year - 1] || "א";
  const semester = pickRandom(["א", "ב"]);
  return `שנה ${letter}׳, סמסטר ${semester}׳`;
}

async function addAcademicYearToUsers() {
  console.log("Setting academicYear for 50 demo users based on their year field...");

  for (let i = 1; i <= 50; i += 1) {
    const userId = `user${String(i).padStart(3, "0")}`;
    const ref = doc(db, "users", userId);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      console.log(`Skipped ${userId}: not found`);
      continue;
    }

    const data = snap.data();
    const year = typeof data.year === "number" ? data.year : 1;
    const academicYear = academicYearForYear(year);

    await updateDoc(ref, { academicYear });
    console.log(`Updated ${userId}: year=${year} -> academicYear="${academicYear}"`);
  }

  console.log("Done.");
}

addAcademicYearToUsers().catch((error) => {
  //console.error("Update failed:", error);
  process.exit(1);
});
