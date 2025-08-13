
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBk9VBWkLOdwlVJXug7ERvT-RuEy07_IU",
  authDomain: "beat-the-clock-e243e.firebaseapp.com",
  projectId: "beat-the-clock-e243e",
  storageBucket: "beat-the-clock-e243e.firebasestorage.app",
  messagingSenderId: "466573436336",
  appId: "1:466573436336:web:f738d70c4a3f477df5a275"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);