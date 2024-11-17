// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBhz4r4PjjQoKP1STobiFIA8_X8lqNlPoY",
  authDomain: "teletherapy-library.firebaseapp.com",
  projectId: "teletherapy-library",
  storageBucket: "teletherapy-library.appspot.com",
  messagingSenderId: "112803752516",
  appId: "1:112803752516:web:e75ba6342fdf1bf097aa11",
  measurementId: "G-EP3KC3X6RF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);