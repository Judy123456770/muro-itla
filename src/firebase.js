import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDZvY9StGPk9m2ebxxSMTYj6Bom7fdl758",
  authDomain: "muro-itla.firebaseapp.com",
  projectId: "muro-itla",
  storageBucket: "muro-itla.firebasestorage.app",
  messagingSenderId: "259469934516",
  appId: "1:259469934516:web:6eabfff7440f52ea30bce1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);