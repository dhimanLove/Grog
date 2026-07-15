// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? "",
};

// Check if Firebase is configured
export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => value.trim().length > 0
);

if (!isFirebaseConfigured) {
  console.warn(
    "[Firebase] Missing Firebase configuration environment variables. Authentication is disabled."
  );
}

// Initialize Firebase
const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : undefined;
export const analytics = app ? getAnalytics(app) : undefined;
export const auth = app ? getAuth(app) : undefined;

export default app;
