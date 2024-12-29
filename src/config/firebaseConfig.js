import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_s2DQ86GMDe1XiVfOT7T9fPA5LAxVFN0",
  authDomain: "tenant-management-system-64046.firebaseapp.com",
  projectId: "tenant-management-system-64046",
  storageBucket: "tenant-management-system-64046.appspot.com", // Corrected bucket name
  messagingSenderId: "388402906664",
  appId: "1:388402906664:web:ee3a92e6098288b432171d"
};

// Initialize Firebase app and auth
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db};
