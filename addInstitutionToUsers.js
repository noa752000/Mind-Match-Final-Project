import { db } from "./src/firebase.js";
import { doc, updateDoc } from "firebase/firestore";

const institutions = [
  "אוניברסיטת תל אביב",
  "האוניברסיטה העברית בירושלים",
  "אוניברסיטת בר-אילן",
  "אוניברסיטת חיפה",
  "אוניברסיטת בן-גוריון בנגב",
  "אוניברסיטת אריאל בשומרון",
  "האוניברסיטה הפתוחה",
  "הטכניון - מכון טכנולוגי לישראל",
  "המכללה האקדמית תל אביב-יפו (MTA)",
  "מכללת אפקה - המכללה האקדמית להנדסה בתל אביב",
  "מכללת רופין",
  "המכללה האקדמית נתניה",
  "המכללה האקדמית ספיר",
  "המכללה האקדמית עמק יזרעאל",
  "המכללה האקדמית כנרת",
  "המכללה האקדמית גליל מערבי",
  "מכללת אשקלון",
  "המרכז האקדמי פרס",
  "המכללה האקדמית הדסה",
  "מכללת סמי שמעון"
];

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

async function addInstitutionToUsers() {
  console.log("Updating institution field for 50 users...");

  for (let i = 1; i <= 50; i += 1) {
    const userId = `user${String(i).padStart(3, "0")}`;
    const institution = pickRandom(institutions);
    await updateDoc(doc(db, "users", userId), { institution });
    console.log(`Updated ${userId}: ${institution}`);
  }

  console.log("Done.");
}

addInstitutionToUsers().catch((error) => {
  console.error("Update failed:", error);
  process.exit(1);
});
