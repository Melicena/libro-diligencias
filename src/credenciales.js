// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCei3HuhrqaiEoz6YHqnAHSZgi1oprdYds",
  authDomain: "diligencias-7ae02.firebaseapp.com",
  projectId: "diligencias-7ae02",
  storageBucket: "diligencias-7ae02.appspot.com",
  messagingSenderId: "328696720515",
  appId: "1:328696720515:web:d2c4293a1bea8ae07cbfb6"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase