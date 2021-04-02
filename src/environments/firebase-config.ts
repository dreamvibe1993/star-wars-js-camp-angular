import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

/**
 * Configuration of my firebase App.
 */
const firebaseConfig = {
  apiKey: "AIzaSyBPhg-hY7CRoSX1DG6ka1FK-kDDVzDMj8E",
    authDomain: "starwars-stars.firebaseapp.com",
    databaseURL: "https://starwars-stars-default-rtdb.firebaseio.com",
    projectId: "starwars-stars",
    storageBucket: "starwars-stars.appspot.com",
    messagingSenderId: "237822454144",
    appId: "1:237822454144:web:4e5fe5bc197b9e79edb965",
    measurementId: "G-3SMGXRM1T9"
  };

/**
 * Initializing my app and getting the database reference.
 */
firebase.initializeApp(firebaseConfig);

/** Exporting the database reference */
export const db = firebase.firestore();