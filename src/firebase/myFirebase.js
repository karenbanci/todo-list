import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAgW2sbgWgID1lD3IUJ0e6ZsYoIZmogwWs",
  authDomain: "todolist-a0e80.firebaseapp.com",
  projectId: "todolist-a0e80",
  storageBucket: "todolist-a0e80.appspot.com",
  messagingSenderId: "111731509566",
  appId: "1:111731509566:web:1f0be204021055ae4e446f",
  measurementId: "G-BY58P8ESSE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export {app, analytics, database};
