import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getStorage, ref, listAll } from "firebase/storage";
import {
  addDoc,
  getFirestore,
  serverTimestamp,
  Timestamp,
  collection,
  orderBy,
  query,
  getDocs,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_apiKey,
  authDomain: process.env.EXPO_PUBLIC_authDomain,
  databaseURL: process.env.EXPO_PUBLIC_databaseURL,
  projectId: process.env.EXPO_PUBLIC_projectId,
  storageBucket: process.env.EXPO_PUBLIC_storageBucket,
  messagingSender: process.env.EXPO_PUBLIC_messagingSender,
  appId: process.env.EXPO_PUBLIC_appId,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

/**
 * list all files in storage
 * @returns list
 */
export const listFiles = async () => {
  try {
    const storage = getStorage();

    // Create a reference under which you want to list
    const listRef = ref(storage, "images");

    // Find all the prefixes and items.
    const listResp = await listAll(listRef);

    if (listResp.items.length === 0) {
      throw new Error("No Images Found");
    }
    return listResp.items;
  } catch (e) {
    throw e;
  }
};

/**
 * save a task to the tasks collection
 *
 * @param {*} docData
 * @returns
 */
export const saveTask = async (docData) => {
  console.log("docData", docData);
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

/**
 *
 * @returns
 */
export const listTasks = async () => {
  try {
    // Create a reference to the cities collection
    const tasksRef = collection(db, "tasks");

    // Create a query against the collection.
    const q = query(tasksRef, orderBy("date_created", "asc"));
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => {
      result.push({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        date_created: doc.data().date_created.toDate(),
        date_due: doc.data().date_due.toDate(),
      });
    });
    return result;
  } catch (e) {
    throw e;
  }
};
