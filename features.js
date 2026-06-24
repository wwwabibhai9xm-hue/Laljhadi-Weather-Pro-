function loadForecast(data) {
    const hourlyDiv = document.getElementById("hourlyForecast");
    const dailyDiv = document.getElementById("dailyForecast");

    hourlyDiv.innerHTML = "";
    dailyDiv.innerHTML = "";

    // Hourly (next 6)
    for (let i = 0; i < 6; i++) {
        hourlyDiv.innerHTML += `
        <div class="card">
            <p>${data.hourly.time[i].split("T")[1]}</p>
            <h3>${data.hourly.temperature_2m[i]}°C</h3>
        </div>`;
    }

    // Daily (7 days)
    for (let i = 0; i < 7; i++) {
        dailyDiv.innerHTML += `
        <div class="card">
            <p>${data.daily.time[i]}</p>
            <h3>${data.daily.temperature_2m_max[i]}° / ${data.daily.temperature_2m_min[i]}°</h3>
        </div>`;
    }
}
