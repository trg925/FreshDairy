// ========================================
// FIREBASE IMPORTS
// ========================================

import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from
"https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


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

const totalCustomersElement =
    document.getElementById("totalCustomers");

const totalOrdersElement =
    document.getElementById("totalOrders");

const totalRevenueElement =
    document.getElementById("totalRevenue");

const customersTable =
    document.getElementById("customersTable");

const customerSearch =
    document.getElementById("customerSearch");


// Store customers for search
let allCustomers = [];


// ========================================
// LOAD CUSTOMERS FROM ORDERS
// ========================================

async function loadCustomers() {

    try {

        const snapshot =
            await getDocs(collection(db, "orders"));

        const customers = {};

        let totalOrders = 0;
        let totalRevenue = 0;


        snapshot.forEach((documentSnapshot) => {

            const order = documentSnapshot.data();

            totalOrders++;

            const orderTotal =
                Number(order.total) || 0;

            totalRevenue += orderTotal;


            // Customer information

            const name =
                order.customer?.name || "Unknown";

            const phone =
                order.customer?.phone || "N/A";


            // Phone used as unique customer ID

            if (!customers[phone]) {

                customers[phone] = {

                    name: name,
                    phone: phone,
                    orders: 0,
                    spent: 0,
                    lastOrder: null

                };

            }


            customers[phone].orders++;

            customers[phone].spent += orderTotal;


            // Last order date

            if (order.createdAt) {

                let orderDate;

                if (
                    typeof order.createdAt.toDate === "function"
                ) {

                    orderDate =
                        order.createdAt.toDate();

                } else {

                    orderDate =
                        new Date(order.createdAt);

                }


                if (
                    !customers[phone].lastOrder ||
                    orderDate >
                    customers[phone].lastOrder
                ) {

                    customers[phone].lastOrder =
                        orderDate;

                }

            }

        });


        // Convert object to array

        allCustomers =
            Object.values(customers);


        // Update cards

        totalCustomersElement.textContent =
            allCustomers.length;

        totalOrdersElement.textContent =
            totalOrders;

        totalRevenueElement.textContent =
            `₹${totalRevenue.toLocaleString("en-IN")}`;


        // Display customers

        displayCustomers(allCustomers);

    }

    catch (error) {

        console.error(
            "Error loading customers:",
            error
        );

        customersTable.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="loading"
                >
                    Unable to load customers.
                </td>

            </tr>

        `;

    }

}


// ========================================
// DISPLAY CUSTOMERS
// ========================================

function displayCustomers(customers) {

    customersTable.innerHTML = "";


    if (customers.length === 0) {

        customersTable.innerHTML = `

            <tr>

                <td
                    colspan="5"
                    class="loading"
                >
                    No customers found.
                </td>

            </tr>

        `;

        return;

    }


    customers.forEach((customer) => {

        let lastOrder = "N/A";


        if (customer.lastOrder) {

            lastOrder =
                customer.lastOrder.toLocaleDateString(
                    "en-IN"
                );

        }


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${customer.name}
                </strong>
            </td>

            <td>
                ${customer.phone}
            </td>

            <td>
                ${customer.orders}
            </td>

            <td>
                <strong>
                    ₹${customer.spent.toLocaleString("en-IN")}
                </strong>
            </td>

            <td>
                ${lastOrder}
            </td>

        `;


        customersTable.appendChild(row);

    });

}


// ========================================
// SEARCH CUSTOMER
// ========================================

customerSearch.addEventListener(
    "input",
    function () {

        const searchValue =
            this.value
                .toLowerCase()
                .trim();


        const filteredCustomers =
            allCustomers.filter((customer) => {

                return (

                    customer.name
                        .toLowerCase()
                        .includes(searchValue)

                    ||

                    customer.phone
                        .toLowerCase()
                        .includes(searchValue)

                );

            });


        displayCustomers(filteredCustomers);

    }
);


// ========================================
// LOGOUT
// ========================================

const logoutBtn =
    document.getElementById("logoutBtn");


logoutBtn.addEventListener(
    "click",
    function () {

        sessionStorage.removeItem(
            "adminLoggedIn"
        );

        window.location.href =
            "admin.html";

    }
);


// ========================================
// START
// ========================================

onAuthStateChanged(auth, (user) => {

    if (user) {
        loadCustomers();
    } else {
        console.log("Admin is not logged in with Firebase Auth");
    }

});