/* ======================================================
   FRESHDAIRY - FINAL SCRIPT.JS
====================================================== */


/* ======================================================
   MOBILE NAVIGATION
====================================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function (event) {
        event.stopPropagation();
        navLinks.classList.toggle("active");
    });
}


/* ======================================================
   CLOSE MOBILE MENU AFTER NAV LINK CLICK
====================================================== */

const navItems = document.querySelectorAll("#navLinks a");

navItems.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});


/* ======================================================
   CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
====================================================== */

document.addEventListener("click", function (event) {

    if (!navLinks || !menuToggle) return;

    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedMenuButton) {
        navLinks.classList.remove("active");
    }

});


/* ======================================================
   SMOOTH SCROLL FOR NAVIGATION LINKS
====================================================== */

document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {

    anchor.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target = document.querySelector(targetId);

        if (target) {
            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

});


/* ======================================================
   PRODUCT DETAILS POPUP
====================================================== */

const productModal = document.getElementById("productModal");
const closeModal = document.getElementById("closeModal");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");

const viewProductButtons =
    document.querySelectorAll(".view-product-btn");


/* ======================================================
   OPEN PRODUCT POPUP
====================================================== */

viewProductButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const productCard = button.closest(".product-card");

        if (!productCard || !productModal) return;

        const productImage =
            productCard.querySelector("img");

        const productName =
            productCard.querySelector("h3");

        const productPrice =
            productCard.querySelector(".price");


        if (productImage && modalImage) {
            modalImage.src = productImage.src;
            modalImage.alt = productName
                ? productName.textContent.trim()
                : "FreshDairy Product";
        }


        if (productName && modalTitle) {
            modalTitle.textContent =
                productName.textContent.trim();
        }


        if (productPrice && modalPrice) {
            modalPrice.textContent =
                productPrice.textContent.trim();
        }


        if (productName && modalDescription) {

            modalDescription.textContent =
                "Fresh and high-quality " +
                productName.textContent.trim() +
                " made with care and delivered fresh to your doorstep.";

        }


        productModal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


/* ======================================================
   CLOSE PRODUCT POPUP
====================================================== */

if (closeModal && productModal) {

    closeModal.addEventListener("click", function () {

        productModal.classList.remove("active");

        document.body.style.overflow = "auto";

    });

}


/* ======================================================
   CLOSE PRODUCT POPUP WHEN CLICKING OUTSIDE
====================================================== */

if (productModal) {

    productModal.addEventListener("click", function (event) {

        if (event.target === productModal) {

            productModal.classList.remove("active");

            document.body.style.overflow = "auto";

        }

    });

}


/* ======================================================
   PRODUCT POPUP ORDER NOW BUTTON
====================================================== */

const popupOrderBtn =
    document.getElementById("popupOrderBtn");

const contactSection =
    document.getElementById("contact");

const contactMessage =
    document.querySelector(".contact-form textarea");


if (popupOrderBtn) {

    popupOrderBtn.addEventListener("click", function () {

        let productName = "FreshDairy Product";
        let productPrice = "";


        if (modalTitle) {
            productName =
                modalTitle.textContent.trim();
        }


        if (modalPrice) {
            productPrice =
                modalPrice.textContent.trim();
        }


        /* Fill Contact Message */

        if (contactMessage) {

            contactMessage.value =
                "Hello, I would like to order " +
                productName +
                " (" +
                productPrice +
                "). Please provide more details.";

        }


        /* Close Popup */

        if (productModal) {
            productModal.classList.remove("active");
        }

        document.body.style.overflow = "auto";


        /* Scroll To Contact */

        if (contactSection) {

            contactSection.scrollIntoView({
                behavior: "smooth"
            });

        }


        /* Focus Message */

        setTimeout(function () {

            if (contactMessage) {
                contactMessage.focus();
            }

        }, 600);

    });

}


/* ======================================================
   NAVBAR ORDER NOW BUTTON
====================================================== */

const navOrderBtn =
    document.getElementById("navOrderBtn");


if (navOrderBtn) {

    navOrderBtn.addEventListener("click", function () {

        if (contactMessage) {

            contactMessage.value =
                "Hello, I would like to order FreshDairy products. Please provide more details.";

        }


        if (contactSection) {

            contactSection.scrollIntoView({
                behavior: "smooth"
            });

        }


        setTimeout(function () {

            if (contactMessage) {
                contactMessage.focus();
            }

        }, 600);

    });

}


/* ======================================================
   PRICING PLAN BUTTONS
====================================================== */

const choosePlanButtons =
    document.querySelectorAll(".choose-plan-btn");


choosePlanButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const pricingCard =
            button.closest(".pricing-card");

        if (!pricingCard) return;


        const planTitle =
            pricingCard.querySelector("h3");

        const planPrice =
            pricingCard.querySelector(".price");


        const planName = planTitle
            ? planTitle.textContent.trim()
            : "FreshDairy Plan";


        const price = planPrice
            ? planPrice.textContent.trim()
            : "";


        if (contactMessage) {

            contactMessage.value =
                "Hello, I am interested in the " +
                planName +
                " (" +
                price +
                "). Please provide more details.";

        }


        if (contactSection) {

            contactSection.scrollIntoView({
                behavior: "smooth"
            });

        }


        setTimeout(function () {

            if (contactMessage) {
                contactMessage.focus();
            }

        }, 600);

    });

});


/* ======================================================
   ABOUT US POPUP
====================================================== */

const learnMoreBtn =
    document.querySelector(".learn-more-btn");

const aboutModal =
    document.getElementById("aboutModal");

const closeAboutModal =
    document.getElementById("closeAboutModal");

const aboutContactBtn =
    document.querySelector(".about-contact-btn");


/* ======================================================
   OPEN ABOUT POPUP
====================================================== */

if (learnMoreBtn && aboutModal) {

    learnMoreBtn.addEventListener("click", function () {

        aboutModal.classList.add("active");

        document.body.style.overflow = "hidden";

    });

}


/* ======================================================
   CLOSE ABOUT POPUP
====================================================== */

if (closeAboutModal && aboutModal) {

    closeAboutModal.addEventListener("click", function () {

        aboutModal.classList.remove("active");

        document.body.style.overflow = "auto";

    });

}


/* ======================================================
   CLOSE ABOUT POPUP WHEN CLICKING OUTSIDE
====================================================== */

if (aboutModal) {

    aboutModal.addEventListener("click", function (event) {

        if (event.target === aboutModal) {

            aboutModal.classList.remove("active");

            document.body.style.overflow = "auto";

        }

    });

}


/* ======================================================
   ABOUT POPUP CONTACT BUTTON
====================================================== */

if (aboutContactBtn) {

    aboutContactBtn.addEventListener("click", function () {

        if (aboutModal) {
            aboutModal.classList.remove("active");
        }

        document.body.style.overflow = "auto";


        if (contactSection) {

            contactSection.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

}


/* ======================================================
   CONTACT FORM
====================================================== */

const contactForm =
    document.getElementById("contactForm");


if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const nameInput =
            contactForm.querySelector('input[type="text"]');

        const emailInput =
            contactForm.querySelector('input[type="email"]');

        const messageInput =
            contactForm.querySelector("textarea");


        const name = nameInput
            ? nameInput.value.trim()
            : "";


        const email = emailInput
            ? emailInput.value.trim()
            : "";


        const message = messageInput
            ? messageInput.value.trim()
            : "";


        /* Name Validation */

        if (name === "") {

            alert("Please enter your name.");

            if (nameInput) {
                nameInput.focus();
            }

            return;

        }


        /* Email Validation */

        if (email === "") {

            alert("Please enter your email address.");

            if (emailInput) {
                emailInput.focus();
            }

            return;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            alert("Please enter a valid email address.");

            if (emailInput) {
                emailInput.focus();
            }

            return;

        }


        /* Message Validation */

        if (message === "") {

            alert("Please enter your message.");

            if (messageInput) {
                messageInput.focus();
            }

            return;

        }


        /* Success */

        alert(
            "Thank you " +
            name +
            "! Your message has been sent successfully."
        );


        contactForm.reset();

    });

}


/* ======================================================
   ESC KEY - CLOSE POPUPS
====================================================== */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        if (productModal) {
            productModal.classList.remove("active");
        }

        if (aboutModal) {
            aboutModal.classList.remove("active");
        }

        if (navLinks) {
            navLinks.classList.remove("active");
        }

        document.body.style.overflow = "auto";

    }

});

const mobileOrderBtn = document.getElementById("mobileOrderBtn");

if (mobileOrderBtn) {
    mobileOrderBtn.addEventListener("click", function () {

        // Mobile menu close
        const navLinks = document.getElementById("navLinks");
        if (navLinks) {
            navLinks.classList.remove("active");
        }

        // Contact section par scroll
        const contactSection = document.getElementById("contact");

        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
}

/* =========================================
   SHOPPING CART
========================================= */

const addCartButtons = document.querySelectorAll(".add-cart-btn");
const cartBtn = document.getElementById("cartBtn");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let cart = [];


/* OPEN CART */

function openCart() {
    cartPanel.classList.add("active");
    cartOverlay.classList.add("active");
}


/* CLOSE CART */

function closeCartPanel() {
    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");
}


cartBtn.addEventListener("click", openCart);

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);


/* ADD PRODUCT */

addCartButtons.forEach((button) => {

    button.addEventListener("click", function () {

        const name = this.dataset.name;
        const price = Number(this.dataset.price);
        const image = this.dataset.image;

        const existingProduct = cart.find(
            (item) => item.name === name
        );

        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                price: price,
                image: image,
                quantity: 1
            });

        }

        updateCart();

        openCart();

    });

});


/* UPDATE CART */

function updateCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty.</p>
            </div>
        `;

    } else {

        cart.forEach((item, index) => {

            const cartItem = document.createElement("div");

            cartItem.className = "cart-item";

            cartItem.innerHTML = `

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-item-info">

                    <h3>${item.name}</h3>

                    <p>₹${item.price}</p>

                    <div class="quantity-controls">

                        <button onclick="changeQuantity(${index}, -1)">
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQuantity(${index}, 1)">
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-cart-item"
                    onclick="removeCartItem(${index})">
                    ×
                </button>

            `;

            cartItems.appendChild(cartItem);

        });

    }


    /* CART COUNT */

    const totalQuantity = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalQuantity;


    /* TOTAL PRICE */

    const totalPrice = cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );

    cartTotal.textContent = totalPrice;

}


/* CHANGE QUANTITY */

function changeQuantity(index, amount) {

    cart[index].quantity += amount;

    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }

    updateCart();

}


/* REMOVE PRODUCT */

function removeCartItem(index) {

    cart.splice(index, 1);

    updateCart();

}

/* =========================================
   CHECKOUT
========================================= */

const checkoutBtn = document.getElementById("checkoutBtn");
const checkoutOverlay = document.getElementById("checkoutOverlay");
const closeCheckout = document.getElementById("closeCheckout");
const checkoutForm = document.getElementById("checkoutForm");
const checkoutTotal = document.getElementById("checkoutTotal");


/* OPEN CHECKOUT */

checkoutBtn.addEventListener("click", function () {

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    const totalPrice = cart.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );

    checkoutTotal.textContent = totalPrice;

    /* Close Cart */

    cartPanel.classList.remove("active");
    cartOverlay.classList.remove("active");

    /* Open Checkout */

    checkoutOverlay.classList.add("active");

});


/* CLOSE CHECKOUT */

closeCheckout.addEventListener("click", function () {
    checkoutOverlay.classList.remove("active");
});


/* CLICK OUTSIDE TO CLOSE */

checkoutOverlay.addEventListener("click", function (event) {

    if (event.target === checkoutOverlay) {
        checkoutOverlay.classList.remove("active");
    }

});


/* =========================================
   PLACE ORDER + FIREBASE
========================================= */

checkoutForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const customerName =
        document.getElementById("customerName").value.trim();

    const customerPhone =
        document.getElementById("customerPhone").value.trim();

    const customerEmail =
        document.getElementById("customerEmail").value.trim();

    const customerAddress =
        document.getElementById("customerAddress").value.trim();

    const customerCity =
        document.getElementById("customerCity").value.trim();

    const customerPin =
        document.getElementById("customerPin").value.trim();


    /* CHECK CART */

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }


    /* CALCULATE TOTAL */

    const totalPrice = cart.reduce(
        (total, item) => total + (item.price * item.quantity),
        0
    );


    /* CREATE ORDER */

    const order = {

        customer: {
            name: customerName,
            phone: customerPhone,
            email: customerEmail,
            address: customerAddress,
            city: customerCity,
            pin: customerPin
        },

        products: cart.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image
        })),

        total: totalPrice,

        payment: "Cash on Delivery"

    };


    /* SAVE ORDER TO FIREBASE */

    if (typeof window.saveOrderToFirebase !== "function") {

        alert("Firebase is not connected. Please try again.");
        return;

    }

    const orderSaved =
        await window.saveOrderToFirebase(order);


    /* SUCCESS */

    if (orderSaved) {

        alert(
            "Thank you " +
            customerName +
            "! Your order has been placed successfully."
        );


        /* CLEAR CART */

        cart = [];

        updateCart();

        checkoutForm.reset();

        checkoutOverlay.classList.remove("active");

    } else {

        alert(
            "Order could not be placed. Please try again."
        );

    }

});