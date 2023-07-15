// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnBP2tjQoUEG7LtXly8Fa3NHC7hTf-b9c",
  authDomain: "linkedin-clone-21fb1.firebaseapp.com",
  projectId: "linkedin-clone-21fb1",
  storageBucket: "linkedin-clone-21fb1.appspot.com",
  messagingSenderId: "704826323146",
  appId: "1:704826323146:web:9f712f1d9e066545784433"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app)

export {auth, app, firestore}