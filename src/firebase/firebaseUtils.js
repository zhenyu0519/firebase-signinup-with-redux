import firebase from "firebase";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAQxYgkO4B8ZZHn8puaUyFmU24KiuFK2Ms",
  authDomain: "slack-chat-pro.firebaseapp.com",
  databaseURL: "https://slack-chat-pro.firebaseio.com",
  projectId: "slack-chat-pro",
  storageBucket: "slack-chat-pro.appspot.com",
  messagingSenderId: "127690203418",
  appId: "1:127690203418:web:68a6e469c445e1fc6a0ca3",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const database = firebase.database();

export default firebase;