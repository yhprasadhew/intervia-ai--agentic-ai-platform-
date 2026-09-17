
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"


const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "intervia-ai.firebaseapp.com",
  projectId: "intervia-ai",
  storageBucket: "intervia-ai.firebasestorage.app",
  messagingSenderId: "865965262177",
  appId: "1:865965262177:web:93dde11e71abe84d27f120",
  measurementId: "G-MG0PDX7ZMY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth(app)

const provider = new GoogleAuthProvider()


export {auth,provider}