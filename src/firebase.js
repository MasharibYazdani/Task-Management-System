// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhn6kwaaeDd0wiO97JMohkL_VLiG0CHdE",
  authDomain: "task-management-system-2938c.firebaseapp.com",
  projectId: "task-management-system-2938c",
  storageBucket: "task-management-system-2938c.appspot.com",
  messagingSenderId: "430534130008",
  appId: "1:430534130008:web:0f1d57d6c2d445076f8d2d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getDatabase(app);
