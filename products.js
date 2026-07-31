// ========================================
// FIREBASE IMPORTS
// ========================================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
}
from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";


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

const productsTable =
    document.getElementById("productsTable");

const totalProducts =
    document.getElementById("totalProducts");

const inStockProducts =
    document.getElementById("inStockProducts");

const outStockProducts =
    document.getElementById("outStockProducts");

const productSearch =
    document.getElementById("productSearch");

const stockFilter =
    document.getElementById("stockFilter");

const addProductBtn =
    document.getElementById("addProductBtn");

const productModal =
    document.getElementById("productModal");

const closeProductModal =
    document.getElementById("closeProductModal");

const productForm =
    document.getElementById("productForm");

const productModalTitle =
    document.getElementById("productModalTitle");

const productId =
    document.getElementById("productId");

const productName =
    document.getElementById("productName");

const productCategory =
    document.getElementById("productCategory");

const productPrice =
    document.getElementById("productPrice");

const productStock =
    document.getElementById("productStock");

const productImage =
    document.getElementById("productImage");

const logoutBtn =
    document.getElementById("logoutBtn");


let allProducts = [];


// ========================================
// CHECK ADMIN LOGIN
// ========================================

onAuthStateChanged(auth, (user) => {

    if (user) {

        loadProducts();

    } else {

        window.location.href = "admin.html";

    }

});


// ========================================
// LOAD PRODUCTS
// ========================================

async function loadProducts() {

    try {

        const snapshot =
            await getDocs(collection(db, "products"));

        allProducts = [];

        snapshot.forEach((productDoc) => {

            allProducts.push({
                id: productDoc.id,
                ...productDoc.data()
            });

        });

        updateStats();
        filterProducts();

    } catch (error) {

        console.error(
            "Error loading products:",
            error
        );

        productsTable.innerHTML = `
            <tr>
                <td colspan="7" class="loading">
                    Unable to load products.
                </td>
            </tr>
        `;

    }

}


// ========================================
// PRODUCT STATS
// ========================================

function updateStats() {

    const inStock =
        allProducts.filter(
            product => Number(product.stock) > 0
        ).length;

    const outStock =
        allProducts.filter(
            product => Number(product.stock) <= 0
        ).length;


    totalProducts.textContent =
        allProducts.length;

    inStockProducts.textContent =
        inStock;

    outStockProducts.textContent =
        outStock;

}


// ========================================
// DISPLAY PRODUCTS
// ========================================

function displayProducts(products) {

    productsTable.innerHTML = "";


    if (products.length === 0) {

        productsTable.innerHTML = `
            <tr>
                <td colspan="7" class="loading">
                    No products found.
                </td>
            </tr>
        `;

        return;

    }


    products.forEach((product) => {

        const stock =
            Number(product.stock) || 0;

        const price =
            Number(product.price) || 0;

        const status =
            stock > 0
                ? "In Stock"
                : "Out of Stock";


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${
                    product.image
                        ? `<img src="${product.image}"
                             class="admin-product-image"
                             alt="${product.name}">`
                        : "No Image"
                }
            </td>

            <td>
                <strong>${product.name || "N/A"}</strong>
            </td>

            <td>
                ${product.category || "N/A"}
            </td>

            <td>
                <strong>
                    ₹${price.toLocaleString("en-IN")}
                </strong>
            </td>

            <td>
                ${stock}
            </td>

            <td>
                <span class="product-stock-status ${
                    stock > 0 ? "in-stock" : "out-stock"
                }">
                    ${status}
                </span>
            </td>

            <td>

                <div class="product-actions">

                    <button
                        class="edit-product-btn"
                        data-id="${product.id}"
                    >
                        Edit
                    </button>

                    <button
                        class="delete-product-btn"
                        data-id="${product.id}"
                    >
                        Delete
                    </button>

                </div>

            </td>

        `;


        productsTable.appendChild(row);

    });


    addProductActionEvents();

}


// ========================================
// SEARCH + FILTER
// ========================================

function filterProducts() {

    const search =
        productSearch.value
            .trim()
            .toLowerCase();

    const filter =
        stockFilter.value;


    const filtered =
        allProducts.filter((product) => {

            const name =
                (product.name || "")
                    .toLowerCase();

            const category =
                (product.category || "")
                    .toLowerCase();

            const stock =
                Number(product.stock) || 0;


            const matchesSearch =
                name.includes(search) ||
                category.includes(search);


            let matchesStock = true;


            if (filter === "instock") {
                matchesStock = stock > 0;
            }


            if (filter === "outofstock") {
                matchesStock = stock <= 0;
            }


            return (
                matchesSearch &&
                matchesStock
            );

        });


    displayProducts(filtered);

}


productSearch.addEventListener(
    "input",
    filterProducts
);


stockFilter.addEventListener(
    "change",
    filterProducts
);


// ========================================
// OPEN ADD PRODUCT MODAL
// ========================================

addProductBtn.addEventListener(
    "click",
    function () {

        productForm.reset();

        productId.value = "";

        productModalTitle.textContent =
            "Add Product";

        productModal.classList.add("show");

    }
);


// ========================================
// CLOSE MODAL
// ========================================

closeProductModal.addEventListener(
    "click",
    function () {

        productModal.classList.remove("show");

    }
);


// ========================================
// SAVE PRODUCT
// ========================================

productForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const productData = {

            name:
                productName.value.trim(),

            category:
                productCategory.value,

            price:
                Number(productPrice.value),

            stock:
                Number(productStock.value),

            image:
                productImage.value.trim(),

            updatedAt:
                serverTimestamp()

        };


        try {

            // EDIT PRODUCT

            if (productId.value) {

                await updateDoc(
                    doc(
                        db,
                        "products",
                        productId.value
                    ),
                    productData
                );

                alert(
                    "Product updated successfully!"
                );

            }

            // ADD PRODUCT

            else {

                productData.createdAt =
                    serverTimestamp();


                await addDoc(
                    collection(db, "products"),
                    productData
                );

                alert(
                    "Product added successfully!"
                );

            }


            productModal.classList.remove("show");

            productForm.reset();

            await loadProducts();

        }

        catch (error) {

            console.error(
                "Product save error:",
                error
            );

            alert(
                "Unable to save product."
            );

        }

    }
);


// ========================================
// EDIT + DELETE EVENTS
// ========================================

function addProductActionEvents() {

    // EDIT

    document
        .querySelectorAll(".edit-product-btn")
        .forEach((button) => {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        this.dataset.id;


                    const product =
                        allProducts.find(
                            item =>
                                item.id === id
                        );


                    if (!product) return;


                    productId.value =
                        product.id;

                    productName.value =
                        product.name || "";

                    productCategory.value =
                        product.category || "";

                    productPrice.value =
                        product.price || 0;

                    productStock.value =
                        product.stock || 0;

                    productImage.value =
                        product.image || "";


                    productModalTitle.textContent =
                        "Edit Product";


                    productModal.classList.add(
                        "show"
                    );

                }
            );

        });


    // DELETE

    document
        .querySelectorAll(".delete-product-btn")
        .forEach((button) => {

            button.addEventListener(
                "click",
                async function () {

                    const id =
                        this.dataset.id;


                    const confirmDelete =
                        confirm(
                            "Are you sure you want to delete this product?"
                        );


                    if (!confirmDelete) {
                        return;
                    }


                    try {

                        await deleteDoc(
                            doc(
                                db,
                                "products",
                                id
                            )
                        );


                        alert(
                            "Product deleted successfully!"
                        );


                        await loadProducts();

                    }

                    catch (error) {

                        console.error(
                            "Delete error:",
                            error
                        );

                        alert(
                            "Unable to delete product."
                        );

                    }

                }
            );

        });

}


// ========================================
// LOGOUT
// ========================================

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        async function () {

            await signOut(auth);

            window.location.href =
                "admin.html";

        }
    );

}