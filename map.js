/* ===========================
   WEATHER FORECAST PRO
   PART 5 - INTERACTIVE MAP
=========================== */

let map;
let marker;

/* ---------- INIT MAP ---------- */
function initMap(lat = 28.3949, lon = 84.1240) {
    // Default location = Nepal

    map = L.map("map").setView([lat, lon], 6);

    // OpenStreetMap layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors"
    }).addTo(map);

    // Add marker
    marker = L.marker([lat, lon]).addTo(map)
        .bindPopup("Selected Location")
        .openPopup();
}

/* ---------- UPDATE MAP LOCATION ---------- */
function updateMap(lat, lon, city = "Location") {
    if (!map) initMap(lat, lon);

    map.setView([lat, lon], 8);

    if (marker) {
        map.removeLayer(marker);
    }

    marker = L.marker([lat, lon]).addTo(map)
        .bindPopup(city)
        .openPopup();
}

/* ---------- CLICK MAP TO GET WEATHER ---------- */
function enableMapClickWeather() {
    map.on("click", function (e) {
        const lat = e.latlng.lat;
        const lon = e.latlng.lng;

        updateMap(lat, lon, "Custom Location");

        // call weather function from script.js
        if (typeof getWeather === "function") {
            getWeather(lat, lon, "Selected Location");
        }
    });
}