// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "mern-blog-4416a.firebaseapp.com",
  projectId: "mern-blog-4416a",
  storageBucket: "mern-blog-4416a.appspot.com",
  messagingSenderId: "468929805421",
  appId: "1:468929805421:web:ebde6e885a283b31211364"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

