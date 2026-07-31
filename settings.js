// ========================================
// FIREBASE IMPORTS
// ========================================

import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from
"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from
"https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


// ========================================
// FIREBASE CONFIG
// ========================================

const firebaseConfig = {
    apiKey: "AIzaSyC0Ru5NPxmXbfxjm7g969WE33ZUGCQKgmQ",
    authDomain: "freshdairy-1fa45.firebaseapp.com",
    projectId: "freshdairy-1fa45",
    storageBucket: "freshdairy-1fa45.firebasestorage.app",
    messagingSenderId: "194434130951",
    appId: "1:194434130951:web:e6f1135f137a7e043176a2"
};


// ========================================
// INITIALIZE FIREBASE
// ========================================

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


// ========================================
// HTML ELEMENTS
// ========================================

const settingsForm =
    document.getElementById("settingsForm");

const businessName =
    document.getElementById("businessName");

const businessPhone =
    document.getElementById("businessPhone");

const businessEmail =
    document.getElementById("businessEmail");

const businessAddress =
    document.getElementById("businessAddress");

const businessLogo =
    document.getElementById("businessLogo");

const logoPreview =
    document.getElementById("logoPreview");

const logoutBtn =
    document.getElementById("logoutBtn");


// ========================================
// LOGO VARIABLE
// ========================================

let selectedLogoBase64 = "";


// ========================================
// LOGO PREVIEW
// ========================================

if (businessLogo && logoPreview) {

    businessLogo.addEventListener(
        "change",
        function () {

            const file = this.files[0];

            if (!file) {
                return;
            }

            // Check image type
            if (!file.type.startsWith("image/")) {

                alert("Please select an image file.");

                this.value = "";

                return;
            }


            // Keep image reasonably small
            if (file.size > 700 * 1024) {

                alert(
                    "Logo image bahut badi hai.\nPlease 700 KB se chhoti image select karo."
                );

                this.value = "";

                return;
            }


            const reader = new FileReader();


            reader.onload = function (event) {

                selectedLogoBase64 =
                    event.target.result;

                logoPreview.src =
                    selectedLogoBase64;

                logoPreview.style.display =
                    "block";

                console.log(
                    "Logo preview loaded successfully"
                );

            };


            reader.onerror = function () {

                alert(
                    "Logo read nahi ho paya."
                );

            };


            reader.readAsDataURL(file);

        }
    );

}


// ========================================
// AUTH CHECK
// ========================================

onAuthStateChanged(
    auth,
    (user) => {

        if (user) {

            console.log(
                "Admin Logged In:",
                user.email
            );

            loadSettings();

        }

        else {

            alert(
                "Please login first."
            );

            window.location.href =
                "admin.html";

        }

    }
);


// ========================================
// LOAD SETTINGS
// ========================================

async function loadSettings() {

    try {

        const settingsRef =
            doc(
                db,
                "settings",
                "business"
            );


        const snapshot =
            await getDoc(settingsRef);


        if (snapshot.exists()) {

            const data =
                snapshot.data();


            businessName.value =
                data.businessName || "";

            businessPhone.value =
                data.businessPhone || "";

            businessEmail.value =
                data.businessEmail || "";

            businessAddress.value =
                data.businessAddress || "";


            // ========================================
            // LOAD SAVED LOGO
            // ========================================

            if (
                data.businessLogo &&
                logoPreview
            ) {

                selectedLogoBase64 =
                    data.businessLogo;

                logoPreview.src =
                    data.businessLogo;

                logoPreview.style.display =
                    "block";

            }

        }

    }

    catch (error) {

        console.error(
            "Error loading settings:",
            error
        );

    }

}


// ========================================
// SAVE SETTINGS
// ========================================

settingsForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        try {

            const settingsRef =
                doc(
                    db,
                    "settings",
                    "business"
                );


            // Data to save
            const settingsData = {

                businessName:
                    businessName.value.trim(),

                businessPhone:
                    businessPhone.value.trim(),

                businessEmail:
                    businessEmail.value.trim(),

                businessAddress:
                    businessAddress.value.trim()

            };


            // Add logo only if available
            if (selectedLogoBase64) {

                settingsData.businessLogo =
                    selectedLogoBase64;

            }


            await setDoc(
                settingsRef,
                settingsData,
                {
                    merge: true
                }
            );


            alert(
                "Settings saved successfully!"
            );

        }

        catch (error) {

            console.error(
                "FULL ERROR:",
                error
            );


            alert(
                "Error Code: " +
                (error.code || "Unknown") +
                "\n\nError Message: " +
                error.message
            );

        }

    }
);


// ========================================
// LOGOUT
// ========================================

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async function () {

            try {

                await signOut(auth);

                window.location.href =
                    "admin.html";

            }

            catch (error) {

                console.error(
                    "Logout Error:",
                    error
                );

            }

        }
    );

}