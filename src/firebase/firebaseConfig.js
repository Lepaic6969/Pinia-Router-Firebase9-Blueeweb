//1. Estas son configuraciones generales del Firebase.

import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyBUuc17kLHdfAUH2BlEj2MGFDkl-FpIWf8",
  authDomain: "vue-pinia-bluuweb.firebaseapp.com",
  projectId: "vue-pinia-bluuweb",
  storageBucket: "vue-pinia-bluuweb.appspot.com",
  messagingSenderId: "58613181714",
  appId: "1:58613181714:web:2fcfe3d34a54a70db0d7cb"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

//2. Ahora vamos con las configuraciones de autenticación.
import { getAuth } from "firebase/auth";

const auth = getAuth();


//3.Configuraciones para el Firestore.
import {getFirestore} from 'firebase/firestore/lite';
const db=getFirestore();

//Realizo todas las exportaciones necesarias
export {auth,db};