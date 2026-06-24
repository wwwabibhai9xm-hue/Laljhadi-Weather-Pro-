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
async function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;

    const data = await fetch(url).then(res => res.json());

    tempEl.innerText = Math.round(data.current.temperature_2m) + "°C";

    descEl.innerText = "Feels Like " +
        Math.round(data.current.apparent_temperature) + "°C";

    windEl.innerText = Math.round(data.current.wind_speed_10m) + " km/h";

    humidityEl.innerText = data.current.relative_humidity_2m + "%";

    rainEl.innerText =
        data.daily.temperature_2m_max[0] + "° / " +
        data.daily.temperature_2m_min[0] + "°";

    sunriseEl.innerText = data.daily.sunrise[0].split("T")[1];

    sunsetEl.innerText = data.daily.sunset[0].split("T")[1];

    loadForecast(data);
}
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
