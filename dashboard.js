// ========================================
// FIREBASE IMPORTS
// ========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
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
// GET HTML ELEMENTS
// ========================================

const totalOrdersElement =
    document.getElementById("totalOrders");

const pendingOrdersElement =
    document.getElementById("pendingOrders");

const totalSalesElement =
    document.getElementById("totalSales");

const totalCustomersElement =
    document.getElementById("totalCustomers");

const ordersTable =
    document.getElementById("ordersTable");

const logoutBtn =
    document.getElementById("logoutBtn");


// ========================================
// CHECK FIREBASE ADMIN LOGIN
// ========================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log("Admin logged in:", user.email);

        // User authenticated hai
        // Ab Firestore se orders load karo

        loadOrders();

    } else {

        console.log("Admin not logged in");

        // Login page par bhejo
        window.location.href = "admin.html";

    }

});


// ========================================
// LOAD ORDERS FROM FIREBASE
// ========================================

async function loadOrders() {

    try {

        console.log("Loading orders...");

        const ordersRef =
            collection(db, "orders");

        const ordersQuery =
            query(
                ordersRef,
                orderBy("createdAt", "desc")
            );

        const snapshot =
            await getDocs(ordersQuery);


        console.log(
            "Orders found:",
            snapshot.size
        );


        let totalOrders = 0;
        let pendingOrders = 0;
        let totalSales = 0;

        const customers = new Set();

        ordersTable.innerHTML = "";


        // ========================================
        // LOOP THROUGH ORDERS
        // ========================================

        snapshot.forEach(
            (documentSnapshot) => {

                const order =
                    documentSnapshot.data();


                totalOrders++;


                // ========================================
                // PENDING ORDERS
                // ========================================

                if (
                    order.orderStatus &&
                    order.orderStatus
                        .toLowerCase() ===
                    "pending"
                ) {

                    pendingOrders++;

                }


                // ========================================
                // TOTAL SALES
                // ========================================

                totalSales +=
                    Number(order.total) || 0;


                // ========================================
                // UNIQUE CUSTOMERS
                // ========================================

                if (order.customer?.phone) {

                    customers.add(
                        order.customer.phone
                    );

                }


                // ========================================
                // PRODUCTS
                // ========================================

                let productNames =
                    "No products";


                if (
                    Array.isArray(
                        order.products
                    ) &&
                    order.products.length > 0
                ) {

                    productNames =
                        order.products
                            .map(product => {

                                const quantity =
                                    product.quantity || 1;

                                return `${product.name} × ${quantity}`;

                            })
                            .join(", ");

                }


                // ========================================
                // CUSTOMER INFORMATION
                // ========================================

                const customerName =
                    order.customer?.name ||
                    "N/A";

                const customerPhone =
                    order.customer?.phone ||
                    "N/A";

                const payment =
                    order.payment ||
                    "N/A";

                const status =
                    order.orderStatus ||
                    "Pending";

                const total =
                    Number(order.total) || 0;


                // ========================================
                // CREATE TABLE ROW
                // ========================================

                const row =
                    document.createElement("tr");


                row.innerHTML = `

                    <td>
                        <strong>
                            ${customerName}
                        </strong>
                    </td>

                    <td>
                        ${customerPhone}
                    </td>

                    <td>
                        ${productNames}
                    </td>

                    <td>
                        <strong>
                            ₹${total.toLocaleString("en-IN")}
                        </strong>
                    </td>

                    <td>
                        ${payment}
                    </td>

                    <td>

                        <span
                            class="status-badge ${status.toLowerCase()}"
                        >
                            ${status}
                        </span>

                    </td>

                `;


                ordersTable.appendChild(row);

            }
        );


        // ========================================
        // UPDATE DASHBOARD CARDS
        // ========================================

        totalOrdersElement.textContent =
            totalOrders;

        pendingOrdersElement.textContent =
            pendingOrders;

        totalSalesElement.textContent =
            `₹${totalSales.toLocaleString("en-IN")}`;

        totalCustomersElement.textContent =
            customers.size;


        // ========================================
        // NO ORDERS
        // ========================================

        if (totalOrders === 0) {

            ordersTable.innerHTML = `

                <tr>

                    <td
                        colspan="6"
                        class="loading"
                    >

                        No orders found.

                    </td>

                </tr>

            `;

        }

    }

    catch (error) {

        console.error(
            "Error loading orders:",
            error
        );


        ordersTable.innerHTML = `

            <tr>

                <td
                    colspan="6"
                    class="loading"
                >

                    Unable to load orders.

                </td>

            </tr>

        `;

    }

}


// ========================================
// FIREBASE LOGOUT
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
                    "Logout error:",
                    error
                );

            }

        }
    );

}