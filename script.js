/* ===========================
   WEATHER FORECAST PRO
   PART 3 - SCRIPT.JS (CORE)
=========================== */

/* ---------- ELEMENTS ---------- */
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const gpsBtn = document.getElementById("gpsBtn");
const darkModeBtn = document.getElementById("darkModeBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");

const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const rainEl = document.getElementById("rain");
const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");

const hourlyForecast = document.getElementById("hourlyForecast");
const dailyForecast = document.getElementById("dailyForecast");

/* ---------- OPEN-METEO API ---------- */
const geoAPI = "https://geocoding-api.open-meteo.com/v1/search";
const weatherAPI = "https://api.open-meteo.com/v1/forecast";

/* ---------- SEARCH CITY ---------- */
searchBtn.addEventListener("click", () => {
    const city = cityInput.value;

    if (city) {
        showLoadingUI();  
        getCoordinates(city);
    }
});

/* ---------- GPS LOCATION ---------- */
gpsBtn.addEventListener("click", () => {
    showLoadingUI();

     navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeather(lat, lon, "Your Location");
        },
        () => alert("Location access denied")
    );
});

/* ---------- GET COORDINATES ---------- */
async function getCoordinates(city) {
    const res = await fetch(`${geoAPI}?name=${city}&count=1`);
    const data = await res.json();

    if (!data.results) {
    showError("City not found!");
    hideLoadingUI();
    return;
}

    const place = data.results[0];
    getWeather(place.latitude, place.longitude, place.name);
}

/* ---------- GET WEATHER ---------- */
async function getWeather(lat, lon, name) {
    const url = `${weatherAPI}?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,wind_speed_10m&daily=sunrise,sunset,temperature_2m_max,temperature_2m_min&timezone=auto`;

    const res = await fetch(url);
    const data = await res.json();

    updateUI(data, name);
    updateMap(lat, lon, name);
    trackCity(name);
}

/* ---------- UPDATE UI ---------- */
function updateUI(data, name) {

    /* CURRENT */
    cityName.textContent = name;
    temperature.textContent = data.current_weather.temperature + "°C";
    description.textContent = getWeatherText(data.current_weather.weathercode);

    windEl.textContent = data.current_weather.windspeed + " km/h";

    humidityEl.textContent =
        data.hourly.relativehumidity_2m[0] + "%";

    rainEl.textContent =
        data.hourly.precipitation_probability[0] + "%";

    sunriseEl.textContent = data.daily.sunrise[0].split("T")[1];
    sunsetEl.textContent = data.daily.sunset[0].split("T")[1];

    /* HOURLY FORECAST */
    hourlyForecast.innerHTML = "";
    for (let i = 0; i < 12; i++) {
        hourlyForecast.innerHTML += `
        <div class="card">
            <p>Hour ${i + 1}</p>
            <p>${data.hourly.temperature_2m[i]}°C</p>
        </div>`;
    }

    /* DAILY FORECAST */
    dailyForecast.innerHTML = "";
    for (let i = 0; i < 7; i++) {
        dailyForecast.innerHTML += `
        <div class="card">
            <p>Day ${i + 1}</p>
            <p>${data.daily.temperature_2m_max[i]}° / ${data.daily.temperature_2m_min[i]}°</p>
        </div>`;
    }

    /* WEATHER CHART */
    createChart(data);
    enhanceUI();
}

/* ---------- CHART ---------- */
let chart;

function createChart(data) {
    const ctx = document.getElementById("weatherChart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: data.hourly.time.slice(0, 12),
            datasets: [{
                label: "Temperature (°C)",
                data: data.hourly.temperature_2m.slice(0, 12),
                borderColor: "blue",
                backgroundColor: "lightblue",
                fill: true
            }]
        }
    });
}

/* ---------- DARK MODE ---------- */
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});