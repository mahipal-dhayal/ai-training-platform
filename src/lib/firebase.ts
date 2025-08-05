// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDm2iag0uXhejEtxu99P9lPl-ZDSJlcy1k",
  authDomain: "ai-traning-9dcd9.firebaseapp.com",
  projectId: "ai-traning-9dcd9",
  storageBucket: "ai-traning-9dcd9.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "1:10357070611:web:ee4360efdd69e8c7c658e6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
