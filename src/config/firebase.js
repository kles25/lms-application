import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDhGdrcMeFcE-_sM2_LMypW9KDSTm_sd3s",
    authDomain: "lms-application-8dd27.firebaseapp.com",
    projectId: "lms-application-8dd27",
    storageBucket: "lms-application-8dd27.appspot.com",
    messagingSenderId: "923122401465",
    appId: "1:923122401465:web:980a65c01faf68aaee1b68",
    measurementId: "G-338QNB2FWF"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);