import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDc4-wKZMx3dWAvh10LVioQYVib6yoNfOA",
  authDomain: "rn-super-blog.firebaseapp.com",
  projectId: "rn-super-blog",
  storageBucket: "rn-super-blog.appspot.com",
  messagingSenderId: "669065134884",
  appId: "1:669065134884:web:1f2d502c6873043f6569b1",
  measurementId: "G-CBBVHBTLG9",
};

export default firebase.initializeApp(firebaseConfig);
