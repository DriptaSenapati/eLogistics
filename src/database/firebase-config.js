// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDScknacUgXHbyZAs-i7vWlop6MWQbf4PA",
  authDomain: "nextjs-login-dd581.firebaseapp.com",
  projectId: "nextjs-login-dd581",
  storageBucket: "nextjs-login-dd581.appspot.com",
  messagingSenderId: "320624612476",
  appId: "1:320624612476:web:7bd352d4784fe3352625f9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);