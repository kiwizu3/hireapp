import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA0D5Bl5eBie4JfqltW3syq7KcIhUgF-F4",
  authDomain: "kasunliyadi101.firebaseapp.com",
  projectId: "kasunliyadi101",
  storageBucket: "kasunliyadi101.appspot.com",
  messagingSenderId: "1038564766280",
  appId: "1:1038564766280:web:4097d07a701d34117b1e7d",
  measurementId: "G-2XL09Q8ENS"
};

if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}

const storage = firebase.storage();

export { storage, firebase as default };


