/* import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "ACA_TU_API_KEY",
  authDomain: "TU_PROYECTO.firebaseapp.com",
  projectId: "TU_PROYECTO",
  storageBucket: "TU_PROYECTO.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); */



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 👈 1. Importá getAuth

const firebaseConfig = {
  apiKey: "AIzaSyAq1K2OSOGJRFiGzfzb7QrwOhKLG6VWtHQ",
  authDomain: "polirubro-14cee.firebaseapp.com",
  projectId: "polirubro-14cee",
  storageBucket: "polirubro-14cee.firebasestorage.app",
  messagingSenderId: "934826253096",
  appId: "1:934826253096:web:faf6100c923cf4825ece1d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app); // 👈 2. ASEGURATE DE EXPORTAR 'auth' AQUÍ