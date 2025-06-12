import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBaN-ZYmiHfnpqlEoUrnTi5pWhKUQvakPE",
  authDomain: "startupdotin-62b64.firebaseapp.com",
  projectId: "startupdotin-62b64",
  storageBucket: "startupdotin-62b64.firebasestorage.app",
  messagingSenderId: "398201372595",
  appId: "1:398201372595:web:a6f944bbee44df0a1b55c6",
  measurementId: "G-QX4HPBZL91"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;