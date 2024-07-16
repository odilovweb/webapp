import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQ5dBnNjlxn8Z7WtgBp0657IzgA6NdFAA",
  authDomain: "tg-miniapp-6cb3f.firebaseapp.com",
  projectId: "tg-miniapp-6cb3f",
  storageBucket: "tg-miniapp-6cb3f.appspot.com",
  messagingSenderId: "309339265333",
  appId: "1:309339265333:web:4c2b326c76ec74832b147c",
  measurementId: "G-6C49GFV49G",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
