let chart;

function loadChart(data) {
    const ctx = document.getElementById("weatherChart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: data.hourly.time.slice(0, 10),
            datasets: [{
                label: "Temperature",
                data: data.hourly.temperature_2m.slice(0, 10),
                fill: false
            }]
        }
    });
}
