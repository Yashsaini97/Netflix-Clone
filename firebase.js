import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCQotlekwjLKQgdIbFni2SzF7eje_5cnSw",
  authDomain: "netflix-colne-adc90.firebaseapp.com",
  projectId: "netflix-colne-adc90",
  storageBucket: "netflix-colne-adc90.firebasestorage.app",
  messagingSenderId: "253811804505",
  appId: "1:253811804505:web:0bb564de135e0e1bc1a448"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    return user;
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
    throw error;
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
    throw error;
  }
};

const logout = () => {
  signOut(auth);
};

export { app, auth, db, login, signup, logout };
