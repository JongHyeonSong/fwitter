import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBKaigBTgj6ppwPDrG_Z0BhMPFsmbpTNzY",
  authDomain: "fwitter-sjh-d5dde.firebaseapp.com",
  databaseURL: "https://fwitter-sjh-d5dde.firebaseio.com",
  projectId: "fwitter-sjh-d5dde",
  storageBucket: "fwitter-sjh-d5dde.appspot.com",
  messagingSenderId: "396521747161",
  appId: "1:396521747161:web:4a977e6d0141adb450c4c8",
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_API_KEY,
//   databaseURL: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_DATABASE_URL,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();
export const firebaseInstance = firebase;
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
