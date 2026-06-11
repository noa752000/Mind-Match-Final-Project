import { db } from "./src/firebase.js";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const YEAR_LETTER_TO_NUMBER = { "א": 1, "ב": 2, "ג": 3, "ד": 4 };

function yearFromAcademicYear(academicYear) {
  const match = academicYear.match(/שנה\s*([אבגד])/);
  const letter = match?.[1];
  return letter ? YEAR_LETTER_TO_NUMBER[letter] : undefined;
}

async function syncYearForAllUsers() {
  const snap = await getDocs(collection(db, "users"));
  let updated = 0;
  let skipped = 0;

  for (const docSnap of snap.docs) {
    const data = docSnap.data();
    const academicYear = data.academicYear;
    if (typeof academicYear !== "string" || !academicYear) {
      skipped += 1;
      continue;
    }

    const expectedYear = yearFromAcademicYear(academicYear);
    if (expectedYear === undefined) {
      skipped += 1;
      continue;
    }

    if (data.year !== expectedYear) {
      await updateDoc(doc(db, "users", docSnap.id), { year: expectedYear });
      console.log(`Updated ${docSnap.id} (${data.fullName || "?"}): year ${data.year} -> ${expectedYear} (academicYear="${academicYear}")`);
      updated += 1;
    } else {
      skipped += 1;
    }
  }

  console.log(`Done. Updated ${updated}, skipped ${skipped}.`);
}

syncYearForAllUsers().catch((error) => {
  console.error("Sync failed:", error);
  process.exit(1);
});
