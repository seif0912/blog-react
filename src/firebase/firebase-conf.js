import  { initializeApp }  from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const app = initializeApp(firebaseConfig)
// export const firestore = getFirestore(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export default app