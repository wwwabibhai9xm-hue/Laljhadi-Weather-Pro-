/* ===========================
   WEATHER FORECAST PRO
   PART 4 - ADVANCED FEATURES
   (ICONS + CLEAN WEATHER + LOADING)
=========================== */

/* ---------- WEATHER ICON SYSTEM ---------- */
function getWeatherIcon(code) {
    // Open-Meteo weather codes
    if (code === 0) return "☀️ Clear Sky";
    if (code === 1 || code === 2) return "🌤️ Partly Cloudy";
    if (code === 3) return "☁️ Cloudy";
    if (code >= 45 && code <= 48) return "🌫️ Fog";
    if (code >= 51 && code <= 57) return "🌦️ Drizzle";
    if (code >= 61 && code <= 67) return "🌧️ Rain";
    if (code >= 71 && code <= 77) return "❄️ Snow";
    if (code >= 80 && code <= 82) return "🌧️ Rain Showers";
    if (code >= 85 && code <= 86) return "🌨️ Snow Showers";
    if (code >= 95) return "⛈️ Thunderstorm";
    return "🌡️ Unknown";
}

/* ---------- LOADING SYSTEM ---------- */
function showLoading() {
    document.getElementById("description").textContent = "Loading weather...";
}

function hideLoading() {
    // handled automatically in updateUI
}

/* ---------- FIX WEATHER DISPLAY ---------- */
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.getHours() + ":00";
}

/* ---------- IMPROVED HOURLY FORECAST ---------- */
function buildHourly(data) {
    let html = "";

    for (let i = 0; i < 24; i++) {
        html += `
        <div class="card">
            <p>${formatTime(data.hourly.time[i])}</p>
            <h3>${data.hourly.temperature_2m[i]}°C</h3>
            <small>${data.hourly.precipitation_probability[i]}% 🌧</small>
        </div>`;
    }

    return html;
}

/* ---------- IMPROVED DAILY FORECAST ---------- */
function buildDaily(data) {
    let html = "";

    for (let i = 0; i < 7; i++) {
        html += `
        <div class="card">
            <p>${data.daily.time[i]}</p>
            <h3>${data.daily.temperature_2m_max[i]}° / ${data.daily.temperature_2m_min[i]}°</h3>
        </div>`;
    }

    return html;
}

/* ---------- WEATHER STATUS TEXT ---------- */
function getWeatherText(code) {
    const map = {
        0: "Clear Sky",
        1: "Mostly Clear",
        2: "Partly Cloudy",
        3: "Cloudy",
        45: "Fog",
        48: "Fog",
        51: "Light Drizzle",
        61: "Rain",
        71: "Snow",
        80: "Rain Showers",
        95: "Thunderstorm"
    };

    return map[code] || "Weather Unknown";
}