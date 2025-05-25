
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, updateProfile, sendPasswordResetEmail } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAT6P-edfZntCwKi031PuEA5Wj6Ejr-6Gg",
  authDomain: "team420expensetrackerapp.firebaseapp.com",
  databaseURL: "https://team420expensetrackerapp-default-rtdb.firebaseio.com",
  projectId: "team420expensetrackerapp",
  storageBucket: "team420expensetrackerapp.firebasestorage.app",
  messagingSenderId: "707896504454",
  appId: "1:707896504454:web:6169279242e3738787a107",
  measurementId: "G-2LTQZGN87H",
};

// Initialize Firebase app (only once!)
const app = initializeApp(firebaseConfig);

// Export initialized services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
