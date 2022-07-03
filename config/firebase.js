import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// adding firebase credentials in order to connect to firebase
const firebaseConfig = {
    apiKey: "AIzaSyArgDfYVs3pi5LBlMh_qXU1o-q_FtAbCMw",
    authDomain: "chatapp-6f894.firebaseapp.com",
    projectId: "chatapp-6f894",
    storageBucket: "chatapp-6f894.appspot.com",
    messagingSenderId: "463623490740",
    appId: "1:463623490740:web:bf47e4df6231c866ad1be1",
};


// initialize firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebaseApp);
//export const db = firebaseApp.firestore();

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(firebaseApp);

