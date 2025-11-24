// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVS5u0h1-jxG6SlSRs7Jaj2xgTKNK9sWQ",
  authDomain: "swift-9os.firebaseapp.com",
  projectId: "swift-9os",
  storageBucket: "swift-9os.firebasestorage.app",
  messagingSenderId: "367703027251",
  appId: "1:367703027251:web:0e21964bf40240afadbd46",
  measurementId: "G-P4R99JSFWT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);