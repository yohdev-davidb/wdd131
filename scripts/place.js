// Static values for temperature and wind speed (in Celsius and km/h)
const temperature = 10; // °C (Static for Socotra Island)
const windSpeed = 5; // km/h (Static for Socotra Island)

// Function to calculate the wind chill in Celsius
function calculateWindChill(tempCelsius, windSpeedKmh) {
    // Formula for wind chill in metric (°C and km/h)
    return (
        13.12 +
        0.6215 * tempCelsius -
        11.37 * Math.pow(windSpeedKmh, 0.16) +
        0.3965 * tempCelsius * Math.pow(windSpeedKmh, 0.16)
    ).toFixed(1); // Return value rounded to one decimal
}

// Check if the conditions are met for wind chill calculation
if (temperature <= 10 && windSpeed > 4.8) {
    // Calculate and display the wind chill factor
    const windChill = calculateWindChill(temperature, windSpeed);
    document.getElementById("windChill").textContent = `${windChill} °C`;
} else {
    // If conditions are not met, display "N/A"
    document.getElementById("windChill").textContent = "N/A";
}

// Get the current year and last modified date
document.getElementById("lastModified").textContent = new Date(document.lastModified).toLocaleDateString();
document.getElementById("currentYear").textContent = new Date().getFullYear();