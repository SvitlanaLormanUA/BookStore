import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAClk7AnJAO3iziEIjzN02mmhIPdWazjaI",
  authDomain: "bambook-bookstore.firebaseapp.com",
  projectId: "bambook-bookstore",
  storageBucket: "bambook-bookstore.appspot.com",
  messagingSenderId: "368731299740",
  appId: "1:368731299740:web:a2ca351c1ebfa42af87259",
  measurementId: "G-136RB7TP2J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
