// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtKyQ2CZ1sMDJSy6SJOTByuyxOwARiKPM",
  authDomain: "netflix-gpt-b9e0b.firebaseapp.com",
  projectId: "netflix-gpt-b9e0b",
  storageBucket: "netflix-gpt-b9e0b.appspot.com",
  messagingSenderId: "600699955104",
  appId: "1:600699955104:web:81ad57b241e9c3107026c5",
  measurementId: "G-3CP4SXTBGX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();