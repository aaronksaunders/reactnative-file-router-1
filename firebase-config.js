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
  apiKey: EXPO_PUBLIC_apiKey,
  authDomain: EXPO_PUBLIC_authDomain,
  databaseURL: EXPO_PUBLIC_databaseURL,
  projectId: EXPO_PUBLIC_projectId,
  storageBucket: EXPO_PUBLIC_storageBucket,
  messagingSender: EXPO_PUBLIC_messagingSender,
  appId: EXPO_PUBLIC_appId,
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
      date_due: Timestamp.fromDate(docData.dueDate),
    });
  } catch (e) {
    throw e;
  }
};
