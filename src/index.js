// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDOxWGSZGp0-oXJZ12JOIuKVbjWAO4Rj_s",
    authDomain: "term-system.firebaseapp.com",
    projectId: "term-system",
    storageBucket: "term-system.appspot.com",
    messagingSenderId: "696625806498",
    appId: "1:696625806498:web:bf59f38ab2c8b750056bfb",
    measurementId: "G-MK5F4SSD8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);