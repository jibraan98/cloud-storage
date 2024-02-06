// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBq71LbYx0kjR03G8rLvRnK_6qBVN43-Go",
  authDomain: "dropbox-clone-78b03.firebaseapp.com",
  projectId: "dropbox-clone-78b03",
  storageBucket: "dropbox-clone-78b03.appspot.com",
  messagingSenderId: "442525180297",
  appId: "1:442525180297:web:fa53b2180325e080040158"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };