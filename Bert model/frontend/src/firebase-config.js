// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCGxYuVK8K5CYQAhbYbHf9VCkSfCdvEQSw",
    authDomain: "mail-dc436.firebaseapp.com",
    projectId: "mail-dc436",
    storageBucket: "mail-dc436.appspot.com",
    messagingSenderId: "34622970017",
    appId: "1:34622970017:web:a92267616e006ae63078e0",
    measurementId: "G-JYG2W6RKBN"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
