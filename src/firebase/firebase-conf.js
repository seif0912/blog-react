// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPZRDLhOkBvRj8tgTQD31Zes4W4AJMq6g",
  authDomain: "blog-71dfe.firebaseapp.com",
  projectId: "blog-71dfe",
  storageBucket: "blog-71dfe.appspot.com",
  messagingSenderId: "234845646005",
  appId: "1:234845646005:web:a57e3268f4bb88766a22fc",
  measurementId: "G-NN466VF8RX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();