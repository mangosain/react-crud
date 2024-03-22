import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Import Firestore module

const firebaseConfig = {
  apiKey: "AIzaSyBCkL87nEdetk2FkCCNcMHPkIdzbNcg-QE",
  authDomain: "react-crud-1-da7dd.firebaseapp.com",
  projectId: "react-crud-1-da7dd",
  storageBucket: "react-crud-1-da7dd.appspot.com",
  messagingSenderId: "720690366417",
  appId: "1:720690366417:web:4af6bf262021d520ea42f0"
};

// Initialize Firebase app
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Access Firestore instance
const firestore = firebaseApp.firestore();

export default firestore; // Export Firestore instance