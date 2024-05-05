import firebase from 'firebase/compat/app'
import "firebase/compat/auth"
import {updateProfile } from "firebase/auth";
import 'firebase/compat/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";




const app = firebase.initializeApp({
  apiKey: "AIzaSyCV6nfkNY7G4gANk1cAMo6TNZutxWnrJVQ",
  authDomain: "finalyearproject-c7265.firebaseapp.com",
  projectId: "finalyearproject-c7265",
  storageBucket: "finalyearproject-c7265.appspot.com",
  messagingSenderId: "774418399181",
  appId: "1:774418399181:web:5b04aa3b576ad19ae30e84"
})



// Initialize Firebase

export const auth = app.auth()
export const firestore = app.firestore()

const storage = getStorage();



export default {app}


export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + '.png');

  setLoading(true);
  
  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, {photoURL});
  
  setLoading(false);
  alert("Uploaded file!");
}