// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB2PYTHIQ1TbhVNfCSoXZxUj1m5Zj4U0Uc",
  authDomain: "datacenter-fc57b.firebaseapp.com",
  databaseURL:
    "https://datacenter-fc57b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "datacenter-fc57b",
  storageBucket: "datacenter-fc57b.appspot.com",
  messagingSenderId: "631426781249",
  appId: "1:631426781249:web:198e0b1caf5000da4376c0",
  measurementId: "G-7PQ4WLM6G5",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const db = getDatabase();

const storage = getStorage();
export { db, storage };
