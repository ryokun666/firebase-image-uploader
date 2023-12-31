import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkYkGIhZD6-RBvh23c6BX_kKuzhlOhnkE",
  authDomain: "image-uploader-cc5bc.firebaseapp.com",
  projectId: "image-uploader-cc5bc",
  storageBucket: "image-uploader-cc5bc.appspot.com",
  messagingSenderId: "786546403138",
  appId: "1:786546403138:web:0f2863318394b716140adb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;

const auth = getAuth(app);
// どのGoogleアカウントでログインするかみたいなポップアップを表示させる。
const provider = new GoogleAuthProvider();

export { auth, provider };
