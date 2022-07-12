import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {firebaseConfig} from "./firebaseConfig";


// initialize firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(firebaseApp);
//export const db = firebaseApp.firestore();

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(firebaseApp);





