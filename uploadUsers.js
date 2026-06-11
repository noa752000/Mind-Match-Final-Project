import { db } from "./src/firebase.js";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const courseIds = [
  "sql",
  "systems_analysis",
  "oop",
  "calculus1",
  "linear_algebra",
  "html_fundamentals",
  "information_systems_economics",
  "cyber_security"
];

const learningTypes = ["knowledge", "analysis", "visual"];
const studentLevels = ["beginner", "intermediate", "advanced"];

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

const YEAR_LETTERS = ["א", "ב", "ג", "ד"];

function academicYearForYear(year) {
  const letter = YEAR_LETTERS[year - 1] || "א";
  const semester = pickRandom(["א", "ב"]);
  return `שנה ${letter}׳, סמסטר ${semester}׳`;
}

const firstNames = [
  "Noa",
  "Ariel",
  "Lior",
  "Gal",
  "Maya",
  "Ori",
  "Yael",
  "Dana",
  "Rotem",
  "Shai",
  "Adi",
  "Nadav",
  "Roni",
  "Inbar",
  "Tamar",
  "Eden",
  "Tal",
  "Keren",
  "Ran",
  "Lidor",
  "Alon",
  "Hadas",
  "Shira",
  "Daniel",
  "Amit",
  "Yarden",
  "Mor",
  "Sarit",
  "Omer",
  "Boaz",
  "Ziv",
  "Kobi",
  "Moran",
  "Lia",
  "Talia",
  "Eran",
  "Iris",
  "Eli",
  "Ronen",
  "Neta",
  "Yair",
  "Hila",
  "Eilat",
  "Rivka",
  "Gadi",
  "Micha",
  "Sivan",
  "Dafna",
  "Aviv",
  "Nimrod"
];

const lastNames = [
  "Cohen",
  "Levi",
  "Mizrahi",
  "Peretz",
  "Barak",
  "Eliav",
  "Azaria",
  "Stern",
  "Sharon",
  "Dayan",
  "Navon",
  "Oren",
  "Shaked",
  "Goldberg",
  "Ben-Ami",
  "Rosen",
  "Alon",
  "David",
  "Harel",
  "Leibowitz",
  "Avraham",
  "Naveh",
  "Tzadok",
  "Bar",
  "Gal",
  "Elbaz",
  "Aharoni",
  "Yosef",
  "Katz",
  "Shamir",
  "Ben-David",
  "Or",
  "Dayan",
  "Zohar",
  "Harari",
  "Golan",
  "Ben-Shimon",
  "Lavi",
  "Friedman",
  "Rivlin"
];

const phonePrefixes = ["050", "052", "053", "054", "055", "058"];

function shuffleArray(array) {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function pickRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function pickUniqueCourses() {
  const shuffled = shuffleArray(courseIds);
  const count = 2 + Math.floor(Math.random() * 3); // 2-4 courses
  return shuffled.slice(0, count);
}

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createPhoneNumber() {
  const prefix = pickRandom(phonePrefixes);
  const suffix = randomInRange(1000000, 9999999).toString();
  return `${prefix}-${suffix.slice(0, 3)}-${suffix.slice(3)}`;
}

function createUsers() {
  const preferredLearningTypeQueue = [
    ...Array(17).fill("visual"),
    ...Array(17).fill("analysis"),
    ...Array(16).fill("knowledge")
  ];
  const studentLevelQueue = [
    ...Array(10).fill("beginner"),
    ...Array(30).fill("intermediate"),
    ...Array(10).fill("advanced")
  ];

  const shuffledLearningTypes = shuffleArray(preferredLearningTypeQueue);
  const shuffledLevels = shuffleArray(studentLevelQueue);
  const shuffledFirstNames = shuffleArray(firstNames);
  const shuffledLastNames = shuffleArray(lastNames);

  const users = [];

  for (let i = 0; i < 50; i += 1) {
    const firstName = shuffledFirstNames[i % shuffledFirstNames.length];
    const lastName = shuffledLastNames[i % shuffledLastNames.length];
    const fullName = `${firstName} ${lastName}`;
    const userId = `user${String(i + 1).padStart(3, "0")}`;
    const preferredLearningType = shuffledLearningTypes[i];
    const studentLevel = shuffledLevels[i];
    const year = randomInRange(1, 4);
    const courses = pickUniqueCourses();

    let averageGrade;
    let completedQuestions;
    let totalStudyMinutes;
    let weeklyStudyMinutes;

    if (studentLevel === "beginner") {
      averageGrade = randomInRange(55, 74);
      completedQuestions = randomInRange(20, 70);
      totalStudyMinutes = randomInRange(1200, 4200);
      weeklyStudyMinutes = randomInRange(80, 240);
    } else if (studentLevel === "intermediate") {
      averageGrade = randomInRange(75, 89);
      completedQuestions = randomInRange(70, 140);
      totalStudyMinutes = randomInRange(4200, 10400);
      weeklyStudyMinutes = randomInRange(180, 520);
    } else {
      averageGrade = randomInRange(90, 100);
      completedQuestions = randomInRange(140, 230);
      totalStudyMinutes = randomInRange(9000, 17600);
      weeklyStudyMinutes = randomInRange(220, 720);
    }

    if (weeklyStudyMinutes >= totalStudyMinutes) {
      weeklyStudyMinutes = Math.max(30, Math.floor(totalStudyMinutes * 0.2));
    }

    const username = `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/[^a-z]/g, "")}`;
    const email = `${username}@mindmatch.com`;

    users.push({
      userId,
      username,
      fullName,
      email,
      phone: createPhoneNumber(),
      institution: pickRandom(institutions),
      year,
      academicYear: academicYearForYear(year),
      selectedCourses: courses,
      preferredLearningType,
      studentLevel,
      averageGrade,
      completedQuestions,
      totalStudyMinutes,
      weeklyStudyMinutes,
      isDemoUser: true,
      createdAt: Timestamp.now(),
      lastLoginAt: Timestamp.now()
    });
  }

  return users;
}

async function uploadUsers() {
  const users = createUsers();
  console.log("Uploading 50 fake users to Firestore...");

  for (const user of users) {
    await setDoc(doc(db, "users", user.userId), user);
    console.log(`Uploaded user: ${user.userId} (${user.fullName})`);
  }

  console.log(`Successfully uploaded ${users.length} users to the users collection.`);
}

uploadUsers().catch((error) => {
  console.error("Upload failed:", error);
  process.exit(1);
});
