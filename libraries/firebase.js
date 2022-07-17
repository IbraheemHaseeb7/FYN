// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsheAkoU4vsnodUrKMn1UUkbT_xhoJC10",
  authDomain: "fight-your-nafs.firebaseapp.com",
  projectId: "fight-your-nafs",
  storageBucket: "fight-your-nafs.appspot.com",
  messagingSenderId: "220457408337",
  appId: "1:220457408337:web:13b191d766693eadaaa570",
  measurementId: "G-HJHD1S2857",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
