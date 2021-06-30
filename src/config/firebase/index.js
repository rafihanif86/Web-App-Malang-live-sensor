import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBomPXLU5x6TOlCKOhcIFaMVuwsjaBIgTA",
    authDomain: "deteksi-d4c8d.firebaseapp.com",
    databaseURL: "https://deteksi-d4c8d.firebaseio.com",
    projectId: "deteksi-d4c8d",
    storageBucket: "deteksi-d4c8d.appspot.com",
    messagingSenderId: "951394864304",
    appId: "1:951394864304:web:9484a90819eb246817ff75",
    measurementId: "G-J2BWR4Z4MD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;