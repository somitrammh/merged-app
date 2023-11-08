import firebase from 'firebase/compat/app';
import "firebase/compat/auth"
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC6yX5StZLHmc3ITTu5HUSwFix8Qe40tU0",
    projectId: "mmh-dashboard",
    appId: "1:961729071732:web:c20426dd130009b0ad1f21"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
