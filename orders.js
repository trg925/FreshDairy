// ========================================
// FIREBASE IMPORTS
// ========================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy,
    doc,
    updateDoc
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
// HTML ELEMENTS
// ========================================

const ordersTable =
    document.getElementById("ordersTable");

const totalOrdersElement =
    document.getElementById("totalOrders");

const pendingOrdersElement =
    document.getElementById("pendingOrders");

const confirmedOrdersElement =
    document.getElementById("confirmedOrders");

const deliveredOrdersElement =
    document.getElementById("deliveredOrders");

const orderSearch =
    document.getElementById("orderSearch");

const statusFilter =
    document.getElementById("statusFilter");

const logoutBtn =
    document.getElementById("logoutBtn");


// Store orders
let allOrders = [];


// ========================================
// CHECK ADMIN LOGIN
// ========================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        console.log(
            "Admin logged in:",
            user.email
        );

        loadOrders();

    } else {

        window.location.href =
            "admin.html";

    }

});


// ========================================
// LOAD ORDERS
// ========================================

async function loadOrders() {

    try {

        ordersTable.innerHTML = `

            <tr>
                <td colspan="7" class="loading">
                    Loading orders...
                </td>
            </tr>

        `;


        const ordersRef =
            collection(db, "orders");


        const ordersQuery =
            query(
                ordersRef,
                orderBy("createdAt", "desc")
            );


        const snapshot =
            await getDocs(ordersQuery);


        allOrders = [];


        snapshot.forEach((documentSnapshot) => {

            allOrders.push({

                id: documentSnapshot.id,

                ...documentSnapshot.data()

            });

        });


        console.log(
            "Orders loaded:",
            allOrders.length
        );


        updateStatistics();

        displayOrders(allOrders);

    }

    catch (error) {

        console.error(
            "Error loading orders:",
            error
        );


        ordersTable.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="loading"
                >
                    Unable to load orders.
                </td>

            </tr>

        `;

    }

}


// ========================================
// UPDATE STATISTICS
// ========================================

function updateStatistics() {

    let pending = 0;
    let confirmed = 0;
    let delivered = 0;


    allOrders.forEach((order) => {

        const status =
            (
                order.orderStatus ||
                "Pending"
            ).toLowerCase();


        if (status === "pending") {

            pending++;

        }


        if (status === "confirmed") {

            confirmed++;

        }


        if (status === "delivered") {

            delivered++;

        }

    });


    totalOrdersElement.textContent =
        allOrders.length;

    pendingOrdersElement.textContent =
        pending;

    confirmedOrdersElement.textContent =
        confirmed;

    deliveredOrdersElement.textContent =
        delivered;

}


// ========================================
// DISPLAY ORDERS
// ========================================

function displayOrders(orders) {

    ordersTable.innerHTML = "";


    if (orders.length === 0) {

        ordersTable.innerHTML = `

            <tr>

                <td
                    colspan="7"
                    class="loading"
                >
                    No orders found.
                </td>

            </tr>

        `;

        return;

    }


    orders.forEach((order) => {

        // CUSTOMER

        const customerName =
            order.customer?.name ||
            "N/A";

        const customerPhone =
            order.customer?.phone ||
            "N/A";


        // PRODUCTS

        let productNames =
            "No products";


        if (
            Array.isArray(order.products) &&
            order.products.length > 0
        ) {

            productNames =
                order.products
                    .map((product) => {

                        const quantity =
                            product.quantity || 1;

                        return `${product.name} × ${quantity}`;

                    })
                    .join(", ");

        }


        // TOTAL

        const total =
            Number(order.total) || 0;


        // PAYMENT

        const payment =
            order.payment ||
            "N/A";


        // STATUS

        const status =
            order.orderStatus ||
            "Pending";


        // ROW

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


            <td>

                <select
                    class="status-select"
                    data-id="${order.id}"
                >

                    <option
                        value="Pending"
                        ${status === "Pending" ? "selected" : ""}
                    >
                        Pending
                    </option>


                    <option
                        value="Confirmed"
                        ${status === "Confirmed" ? "selected" : ""}
                    >
                        Confirmed
                    </option>


                    <option
                        value="Delivered"
                        ${status === "Delivered" ? "selected" : ""}
                    >
                        Delivered
                    </option>


                    <option
                        value="Cancelled"
                        ${status === "Cancelled" ? "selected" : ""}
                    >
                        Cancelled
                    </option>

                </select>

            </td>

        `;


        ordersTable.appendChild(row);

    });


    addStatusListeners();

}


// ========================================
// STATUS CHANGE
// ========================================

function addStatusListeners() {

    const statusSelects =
        document.querySelectorAll(
            ".status-select"
        );


    statusSelects.forEach((select) => {

        select.addEventListener(
            "change",
            async function () {

                const orderId =
                    this.dataset.id;

                const newStatus =
                    this.value;


                await updateOrderStatus(
                    orderId,
                    newStatus
                );

            }
        );

    });

}


// ========================================
// UPDATE FIRESTORE STATUS
// ========================================

async function updateOrderStatus(
    orderId,
    newStatus
) {

    try {

        const orderRef =
            doc(
                db,
                "orders",
                orderId
            );


        await updateDoc(
            orderRef,
            {
                orderStatus:
                    newStatus
            }
        );


        console.log(
            "Order status updated:",
            newStatus
        );


        // Update local data

        const order =
            allOrders.find(
                item =>
                    item.id === orderId
            );


        if (order) {

            order.orderStatus =
                newStatus;

        }


        updateStatistics();

        filterOrders();


        alert(
            `Order status changed to ${newStatus}`
        );

    }

    catch (error) {

        console.error(
            "Status update error:",
            error
        );


        alert(
            "Unable to update order status."
        );


        // Reload correct Firebase data
        loadOrders();

    }

}


// ========================================
// SEARCH + FILTER
// ========================================

function filterOrders() {

    const searchValue =
        orderSearch.value
            .trim()
            .toLowerCase();


    const selectedStatus =
        statusFilter.value
            .toLowerCase();


    const filteredOrders =
        allOrders.filter((order) => {

            const customerName =
                (
                    order.customer?.name ||
                    ""
                ).toLowerCase();


            const phone =
                String(
                    order.customer?.phone ||
                    ""
                ).toLowerCase();


            const orderStatus =
                (
                    order.orderStatus ||
                    "Pending"
                ).toLowerCase();


            const matchesSearch =

                customerName.includes(
                    searchValue
                ) ||

                phone.includes(
                    searchValue
                );


            const matchesStatus =

                selectedStatus === "all" ||

                orderStatus ===
                selectedStatus;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    displayOrders(
        filteredOrders
    );

}


// ========================================
// SEARCH EVENT
// ========================================

orderSearch.addEventListener(
    "input",
    filterOrders
);


// ========================================
// FILTER EVENT
// ========================================

statusFilter.addEventListener(
    "change",
    filterOrders
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
                    "Logout error:",
                    error
                );

            }

        }
    );

}