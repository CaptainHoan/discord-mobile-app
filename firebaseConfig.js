import { FIREBASE_KEY } from '@env';
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: FIREBASE_KEY,
    authDomain: "discord-7e896.firebaseapp.com",
    projectId: "discord-7e896",
    storageBucket: "discord-7e896.appspot.com",
    messagingSenderId: "178205598417",
    appId: "1:178205598417:web:7a07b34c9252011641dbf0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
