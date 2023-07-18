// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1KF2fFcBG5tPDO8b_dV0Wh128mArFhvs",
    authDomain: "mdlite-8e5c8.firebaseapp.com",
    projectId: "mdlite-8e5c8",
    storageBucket: "mdlite-8e5c8.appspot.com",
    messagingSenderId: "107515585814",
    appId: "1:107515585814:web:6cd3cd0feb09920bcd1c37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
