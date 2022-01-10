import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYGM-o3jWibVquSYKJ0uYh4qxtG0-1rk8",
  authDomain: "belajar-firebase-482.firebaseapp.com",
  projectId: "belajar-firebase-482",
  storageBucket: "belajar-firebase-482.appspot.com",
  messagingSenderId: "655793001739",
  appId: "1:655793001739:web:a0ea3187b8a09a20a8be0e",
  measurementId: "G-0RH58W1Q5Z"
  //...
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase();

export default app;