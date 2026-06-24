/* ===========================
   WEATHER FORECAST PRO
   PART 6 - FAVORITES + LANGUAGE + STORAGE
=========================== */

/* ---------- STORAGE KEYS ---------- */
const FAVORITES_KEY = "weather_favorites";
const RECENT_KEY = "weather_recent";
const LANG_KEY = "weather_lang";

/* ---------- LOAD DATA ---------- */
let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
let recent = JSON.parse(localStorage.getItem(RECENT_KEY)) || [];
let language = localStorage.getItem(LANG_KEY) || "en";

/* ---------- SAVE HELPERS ---------- */
function saveFavorites() {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

function saveRecent() {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recent));
}

function saveLanguage() {
    localStorage.setItem(LANG_KEY, language);
}

/* ---------- FAVORITES ---------- */
function addFavorite(city) {
    if (!favorites.includes(city)) {
        favorites.push(city);
        saveFavorites();
        renderFavorites();
    }
}

function removeFavorite(city) {
    favorites = favorites.filter(c => c !== city);
    saveFavorites();
    renderFavorites();
}

function renderFavorites() {
    const list = document.getElementById("favoritesList");
    if (!list) return;

    list.innerHTML = "";

    favorites.forEach(city => {
        list.innerHTML += `
        <li onclick="getCoordinates('${city}')">
            ⭐ ${city}
            <button onclick="removeFavorite('${city}')">❌</button>
        </li>`;
    });
}

/* ---------- RECENT SEARCH ---------- */
function addRecent(city) {
    if (!recent.includes(city)) {
        recent.unshift(city);
        if (recent.length > 5) recent.pop();
        saveRecent();
    }
}

/* ---------- LANGUAGE SYSTEM ---------- */
const translations = {
    en: {
        search: "Search any city",
        wind: "Wind",
        humidity: "Humidity",
        rain: "Rain Chance"
    },
    np: {
        search: "शहर खोज्नुहोस्",
        wind: "हावा",
        humidity: "आर्द्रता",
        rain: "वर्षाको सम्भावना"
    }
};

function setLanguage(lang) {
    language = lang;
    saveLanguage();
    applyLanguage();
}

function applyLanguage() {
    const t = translations[language];

    if (document.getElementById("cityInput")) {
        document.getElementById("cityInput").placeholder = t.search;
    }

    document.querySelectorAll(".card h3").forEach(el => {
        if (el.textContent.includes("Wind")) el.textContent = t.wind;
        if (el.textContent.includes("Humidity")) el.textContent = t.humidity;
        if (el.textContent.includes("Rain")) el.textContent = t.rain;
    });
}

/* ---------- AUTO SAVE ON SEARCH ---------- */
function trackCity(city) {
    addRecent(city);
}

/* ---------- INIT SYSTEM ---------- */
function initFeatures() {
    renderFavorites();
    applyLanguage();
}