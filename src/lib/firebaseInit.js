// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeAv2HjNee2fxrHNL2MYminq5sP5PGB9E",
  authDomain: "mooc-project-d9743.firebaseapp.com",
  projectId: "mooc-project-d9743",
  storageBucket: "mooc-project-d9743.appspot.com",
  messagingSenderId: "391100662422",
  appId: "1:391100662422:web:e0e1905430525423f6f8b7",
  measurementId: "G-2E9F2NN91S"
};

// Initialize Firebase
const fire = initializeApp(firebaseConfig);

export default fire;
