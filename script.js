const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const gpsBtn = document.getElementById("gpsBtn");

const cityName = document.getElementById("cityName");
const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description");

const windEl = document.getElementById("wind");
const humidityEl = document.getElementById("humidity");
const rainEl = document.getElementById("rain");
const sunriseEl = document.getElementById("sunrise");
const sunsetEl = document.getElementById("sunset");

let map, marker;

// 🌍 Search city
searchBtn.addEventListener("click", () => {
    if (cityInput.value.trim() !== "") {
        getWeatherByCity(cityInput.value);
    }
});

// 📍 GPS location
gpsBtn.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(pos => {
        getWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
    });
});

// 🌦️ City weather
async function getWeatherByCity(city) {
    const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then(res => res.json());

    if (!geo.results) return alert("City not found");

    const { latitude, longitude, name } = geo.results[0];
    cityName.innerText = name;

    fetchWeather(latitude, longitude);
}

// 🌦️ Coordinates weather
async function getWeatherByCoords(lat, lon) {
    fetchWeather(lat, lon);
}

// 🌦️ Main API call
function loadForecast(data) {
    const forecast = document.getElementById("forecast");

    if (!forecast) return;

    forecast.innerHTML = "";

    data.daily.time.forEach((day, index) => {
        forecast.innerHTML += `
        <div class="forecast-card">
            <h4>${day}</h4>
            <p>🌡 ${data.daily.temperature_2m_max[index]}° /
            ${data.daily.temperature_2m_min[index]}°</p>
        </div>
        `;
    });
}

function loadChart(data) {
    console.log("Chart loaded");
}

function loadMap(lat, lon) {
    console.log("Map loaded", lat, lon);
}

window.onload = () => {
    getWeatherByCity("Kathmandu");
};
