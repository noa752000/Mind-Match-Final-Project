import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBmtLpXeIRaewc57p_kuyeZKr2VVvgq-WM",
  authDomain: "studysphere-902a0.firebaseapp.com",
  projectId: "studysphere-902a0",
  storageBucket: "studysphere-902a0.appspot.com",
  messagingSenderId: "822295601816",
  appId: "1:822295601816:web:06a3f69d0fa255098926ed"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);