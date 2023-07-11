import { getApp, initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from "firebase/storage";
import {
  FieldValue,
  addDoc,
  doc,
  getFirestore,
  serverTimestamp,
  Timestamp,
  collection,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC7XBiaPpX3tbmsO7oofWsNYK7ZP3fkkzU",
  authDomain: "new-web-project-45936.firebaseapp.com",
  databaseURL: "https://new-web-project-45936.firebaseio.com",
  projectId: "new-web-project-45936",
  storageBucket: "new-web-project-45936.appspot.com",
  messagingSenderId: "882846816313",
  appId: "1:882846816313:web:4bb4f96fa6c29e5cfcd5e8",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const listFiles = async () => {
  try {
    const storage = getStorage();

    // Create a reference under which you want to list
    const listRef = ref(storage, "images");

    // Find all the prefixes and items.
    const listResp = await listAll(listRef).catch((e) => {
      throw e;
    });

    if (listResp.items.length === 0) {
      throw new Error("No Images Found");
    }
    return listResp.items;
  } catch (e) {
    throw e;
  }
};
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

/**
 * 
 * @param {*} docData 
 * @returns 
 */
export const saveTask = async (docData) => {
  console.log('docData', docData)
  try {
    return await addDoc(collection(db, "tasks"), {
      title: docData.title,
      description: docData.description,
      date_created: serverTimestamp(),
      date_due: Timestamp.fromDate(docData.dueDate)),
    });
  } catch (e) {
    throw e;
  }
};
