import 'firebase/analytics';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

/**
 * Configuration of my firebase App.
 */
const firebaseConfig = {
  apiKey: "AIzaSyA-VnpxuMGw5OAb71i-9SrZdLXJsho8D6o",
  authDomain: "star-wars-all-stars.firebaseapp.com",
  databaseURL: "https://star-wars-all-stars-default-rtdb.firebaseio.com",
  projectId: "star-wars-all-stars",
  storageBucket: "star-wars-all-stars.appspot.com",
  messagingSenderId: "775785381521",
  appId: "1:775785381521:web:08cd5039529aac26704930",
  measurementId: "G-T7RS5XF38F"
};

/**
 * Initializing my app and getting the database reference.
 */
firebase.initializeApp(firebaseConfig);

/** Exporting the database reference */
export const db = firebase.firestore();