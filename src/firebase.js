import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDkAhCcQRlbU2IWbMo95TQYUoN01Z7TSkg",
    authDomain: "laundryproviderapp.firebaseapp.com",
    projectId: "laundryproviderapp",
    storageBucket: "laundryproviderapp.firebasestorage.app",
    messagingSenderId: "1094703491634",
    appId: "1:1094703491634:web:301bc2c704c0d44ec6ea2b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);