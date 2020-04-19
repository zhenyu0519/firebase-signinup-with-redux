import firebase from "firebase";
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

export const firestore = firebase.firestore();

// google sign in
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// save the user profile to database
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  // If there is no snapshot exist, then create one (first time logged in)
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export default firebase;
