import { db } from "./src/firebase.js";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

const OLD_ID = "information-security";
const NEW_ID = "cyber_security";

async function migrateUsers() {
  const snap = await getDocs(
    query(collection(db, "users"), where("selectedCourses", "array-contains", OLD_ID))
  );

  for (const docSnap of snap.docs) {
    await updateDoc(doc(db, "users", docSnap.id), {
      selectedCourses: arrayRemove(OLD_ID),
    });
    await updateDoc(doc(db, "users", docSnap.id), {
      selectedCourses: arrayUnion(NEW_ID),
    });
    console.log(`Updated users/${docSnap.id}: selectedCourses ${OLD_ID} -> ${NEW_ID}`);
  }

  console.log(`Done. Migrated ${snap.size} users docs.`);
}

async function migrateCourseProgress() {
  const snap = await getDocs(
    query(collection(db, "course_progress"), where("courseId", "==", OLD_ID))
  );

  for (const docSnap of snap.docs) {
    const data = docSnap.data();
    const newId = `${data.userId}_${NEW_ID}`;
    const newData = { ...data, courseId: NEW_ID };

    const existing = await getDoc(doc(db, "course_progress", newId));
    if (existing.exists()) {
      const existingUpdated = existing.data().updatedAt?.seconds || 0;
      const oldUpdated = data.updatedAt?.seconds || 0;
      if (oldUpdated > existingUpdated) {
        await setDoc(doc(db, "course_progress", newId), newData);
        console.log(`Replaced course_progress/${newId} with data from ${docSnap.id} (more recent)`);
      } else {
        console.log(`Kept existing course_progress/${newId} (more recent), discarding ${docSnap.id}`);
      }
    } else {
      await setDoc(doc(db, "course_progress", newId), newData);
      console.log(`Migrated course_progress/${docSnap.id} -> ${newId}`);
    }

    await deleteDoc(doc(db, "course_progress", docSnap.id));
  }

  console.log(`Done. Migrated ${snap.size} course_progress docs.`);
}

async function migrateCourseIdField(collectionName) {
  const snap = await getDocs(
    query(collection(db, collectionName), where("courseId", "==", OLD_ID))
  );

  for (const docSnap of snap.docs) {
    await updateDoc(doc(db, collectionName, docSnap.id), { courseId: NEW_ID });
    console.log(`Updated ${collectionName}/${docSnap.id}: courseId -> ${NEW_ID}`);
  }

  console.log(`Done. Migrated ${snap.size} ${collectionName} docs.`);
}

async function run() {
  await migrateUsers();
  await migrateCourseProgress();
  await migrateCourseIdField("practice_results");
  await migrateCourseIdField("questions");
  await migrateCourseIdField("studySessions");
}

run().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
