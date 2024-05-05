import firebase from 'firebase/compat/app'
import "firebase/compat/auth"
import {updateProfile } from "firebase/auth";
import 'firebase/compat/firestore'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";




const app = firebase.initializeApp({
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: "finalyearproject-c7265",
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MSG_SENDER_ID,
  appId: APP_ID
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
