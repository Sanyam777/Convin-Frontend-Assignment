// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAG2WyXIw3yV__o2tqaAC7NkBptdhm1LRI",
    authDomain: "convin-assignment-1c77c.firebaseapp.com",
    projectId: "convin-assignment-1c77c",
    storageBucket: "convin-assignment-1c77c.appspot.com",
    messagingSenderId: "956083288822",
    appId: "1:956083288822:web:e162b26e0ee6e6f0a30ad7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };