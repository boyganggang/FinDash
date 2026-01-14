// firebase_config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhpVXfYuATe1hLUPt2mDo8A2Ro-dUljxs",
  authDomain: "fintrack-7b869.firebaseapp.com",
  projectId: "fintrack-7b869",
  storageBucket: "fintrack-7b869.appspot.com",
  messagingSenderId: "265697308352",
  appId: "1:265697308352:web:b20ca1ef457a822f108725",
  measurementId: "G-ED8XFPY8MB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
