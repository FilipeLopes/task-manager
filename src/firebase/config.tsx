import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDVIf8VlwiE77aIF0FDjBflfILMqD8rNgY",
    authDomain: "task-manager-3743b.firebaseapp.com",
    projectId: "task-manager-3743b",
    storageBucket: "task-manager-3743b.appspot.com",
    messagingSenderId: "705947093009",
    appId: "1:705947093009:web:67458846bb9151565a89b0"
};

const app = initializeApp(firebaseConfig);
const authFire = getAuth(app);
const db = getFirestore();

export { authFire, db };

