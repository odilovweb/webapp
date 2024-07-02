import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBy4G_II0BOhsN9q901dBtM0zo5cTqxp8Q",
  authDomain: "solana-xi.firebaseapp.com",
  projectId: "solana-xi",
  storageBucket: "solana-xi.appspot.com",
  messagingSenderId: "458534977394",
  appId: "1:458534977394:web:0357e22cc52744dd3c27eb",
  measurementId: "G-EEXYCZZJXV",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
