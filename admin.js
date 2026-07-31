console.log("ADMIN JS LOADED");

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0Ru5NPxmXbfxjm7g969WE33ZUGCQKgmQ",
    authDomain: "freshdairy-1fa45.firebaseapp.com",
    projectId: "freshdairy-1fa45",
    storageBucket: "freshdairy-1fa45.firebasestorage.app",
    messagingSenderId: "194434130951",
    appId: "1:194434130951:web:e6f1135f137a7e043176a2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Login form
const adminLoginForm = document.getElementById("adminLoginForm");

adminLoginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    console.log("LOGIN BUTTON CLICKED");

    const email =
        document.getElementById("adminUsername").value.trim();

    const password =
        document.getElementById("adminPassword").value;

    console.log("Trying login with:", email);

    try {

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        console.log("LOGIN SUCCESSFUL");

        window.location.href = "dashboard.html";

    } catch (error) {

        console.error("Login error:", error.code, error.message);

        alert("Login failed: " + error.code);

    }

});