import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Added Firestore
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB8GgvW79OxLF_pz3vUoW1nHl75oxFkEUI",
    authDomain: "memoria-9eac1.firebaseapp.com",
    databaseURL: "https://memoria-9eac1-default-rtdb.firebaseio.com",
    projectId: "memoria-9eac1",
    storageBucket: "memoria-9eac1.firebasestorage.app",
    messagingSenderId: "25789854652",
    appId: "1:25789854652:web:a2f928a20048be1077b1b9",
    measurementId: "G-GL63SM3VNT"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const rdb = getDatabase(app);
