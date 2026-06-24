/* ===========================
   WEATHER FORECAST PRO
   PART 7 - UI POLISH SYSTEM
=========================== */

/* ---------- LOADING SCREEN ---------- */
function showLoadingUI() {
    let loader = document.getElementById("loader");

    if (!loader) {
        loader = document.createElement("div");
        loader.id = "loader";
        loader.innerHTML = "⏳ Loading weather...";
        document.body.appendChild(loader);
    }

    loader.style.display = "block";
}

/* ---------- HIDE LOADING ---------- */
function hideLoadingUI() {
    const loader = document.getElementById("loader");
    if (loader) loader.style.display = "none";
}

/* ---------- ERROR HANDLING ---------- */
function showError(message) {
    let errorBox = document.getElementById("errorBox");

    if (!errorBox) {
        errorBox = document.createElement("div");
        errorBox.id = "errorBox";
        document.body.appendChild(errorBox);
    }

    errorBox.innerText = "⚠️ " + message;
    errorBox.style.display = "block";

    setTimeout(() => {
        errorBox.style.display = "none";
    }, 4000);
}

/* ---------- SMOOTH ANIMATION ---------- */
function animateCards() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";

        setTimeout(() => {
            card.style.transition = "0.4s ease";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, index * 80);
    });
}

/* ---------- AUTO CALL AFTER UI UPDATE ---------- */
function enhanceUI() {
    hideLoadingUI();
    animateCards();
}