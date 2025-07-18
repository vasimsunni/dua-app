import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2eYWkJpl5AssSnn26VrEGB2LF-clO5Sg",
  authDomain: "dua-app-2025.firebaseapp.com",
  databaseURL: "https://dua-app-2025-default-rtdb.firebaseio.com",
  projectId: "dua-app-2025",
  storageBucket: "dua-app-2025.firebasestorage.app",
  messagingSenderId: "682448194774",
  appId: "1:682448194774:web:6b10bc6277f9539f234d77",
  measurementId: "G-9SBVMHYRDZ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };