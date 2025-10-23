import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBv8vy0L_-Pdo8bihgBo1XxWGQ1gdSbTbM",
  authDomain: "movies-app-ebaf2.firebaseapp.com",
  projectId: "movies-app-ebaf2",
  storageBucket: "movies-app-ebaf2.appspot.com",
  messagingSenderId: "1059682418692",
  appId: "1:1059682418692:web:e1602d59dc6b55b8ed7551",
  measurementId: "G-FY9KFFHJNW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const db = getFirestore(app)

