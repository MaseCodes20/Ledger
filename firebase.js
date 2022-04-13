// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkLuc0GpHe9vr41nS9TMB0-UhUwYdNTwc",
  authDomain: "ledger-431f1.firebaseapp.com",
  projectId: "ledger-431f1",
  storageBucket: "ledger-431f1.appspot.com",
  messagingSenderId: "309174158556",
  appId: "1:309174158556:web:c0472ddff2fb378b732019",
  measurementId: "G-R0YS5STPRN",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const analytics = getAnalytics(app);

export { app, db, storage };
