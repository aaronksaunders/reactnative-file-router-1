import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Initialize Firebase
const firebaseConfig = {

};

export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence : getReactNativePersistence(AsyncStorage)
}) 
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
