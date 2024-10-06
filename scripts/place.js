
const temperature = 10;
const windSpeed = 5;

function calculateWindChill(tempCelsius, windSpeedKmh) {
    return (
        13.12 +
        0.6215 * tempCelsius -
        11.37 * Math.pow(windSpeedKmh, 0.16) +
        0.3965 * tempCelsius * Math.pow(windSpeedKmh, 0.16)
    ).toFixed(1);
}

if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed);
    document.getElementById("windChill").textContent = `${windChill} °C`;
} else {
    document.getElementById("windChill").textContent = "N/A";
}

document.getElementById("lastModified").textContent = new Date(document.lastModified).toLocaleDateString();