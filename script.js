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