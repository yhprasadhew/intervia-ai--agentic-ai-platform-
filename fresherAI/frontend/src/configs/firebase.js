import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_APIKEY ||
    "AIzaSyACR2FKt3rt7F0NrjExk1ItaUnpbtlKFX8",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "intervia-ai.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "intervia-ai",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "intervia-ai.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "865965262177",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:865965262177:web:93dde11e71abe84d27f120",
  measurementId:
    import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MG0PDX7ZMY",
};

// Initialize Firebase only once
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Force select account prompt
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export {
  app,
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
};
