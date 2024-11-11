// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuONaglzaI0hweTiPVGXLfAPWnRyacJ-Q",
  authDomain: "iot-teamproject.firebaseapp.com",
  databaseURL: "https://iot-teamproject-default-rtdb.firebaseio.com",
  projectId: "iot-teamproject",
  storageBucket: "iot-teamproject.appspot.com",
  messagingSenderId: "448103738843",
  appId: "1:448103738843:web:3fa0978bdbb6d913bccbfe",
  measurementId: "G-S00S5CRC80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app