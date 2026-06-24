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
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&hourly=temperature_2m&timezone=auto`;

    const data = await fetch(url).then(res => res.json());

    const current = data.current_weather;

    tempEl.innerText = current.temperature + "°C";
    descEl.innerText = "Wind: " + current.windspeed + " km/h";

    windEl.innerText = current.windspeed + " km/h";
    humidityEl.innerText = "--"; // not available in free API
    rainEl.innerText = "--";

    sunriseEl.innerText = data.daily.sunrise[0].split("T")[1];
    sunsetEl.innerText = data.daily.sunset[0].split("T")[1];

    loadChart(data);
    loadMap(lat, lon);
    loadForecast(data);
}
