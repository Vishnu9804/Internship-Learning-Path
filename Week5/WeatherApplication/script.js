const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCard = document.querySelector(".weather");
const errorMsg = document.querySelector(".error");
const loader = document.querySelector(".loader");

async function checkWeather(cityName) {
    // 1. Reset UI
    weatherCard.style.display = "none";
    errorMsg.style.display = "none";
    loader.style.display = "block";

    try {
        // STEP 1: Get Coordinates (Latitude & Longitude) from City Name
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        // If city not found, throw error
        if (!geoData.results) {
            throw new Error("City not found");
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        const name = geoData.results[0].name;

        // STEP 2: Get Weather using those Coordinates
        // Updated to use the new 'current' parameter with specific variables
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        // STEP 3: Update UI
        // We now access 'current' instead of 'current_weather'
        const current = weatherData.current;

        document.querySelector(".city").innerHTML = name;
        
        // precise variable: temperature_2m
        document.querySelector(".temp").innerHTML = Math.round(current.temperature_2m) + "°c";
        
        // precise variable: wind_speed_10m
        document.querySelector(".wind").innerHTML = current.wind_speed_10m + " km/h"; 

        // precise variable: relative_humidity_2m
        document.querySelector(".humidity").innerHTML = current.relative_humidity_2m + "%";
        
        // Update Icons based on WMO codes (Open-Meteo uses codes)
        // Code 0 = Clear, 1-3 = Cloudy, 50-60 = Rain, etc.
        // precise variable: weather_code
        const code = current.weather_code;
        
        if (code === 0) {
             weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Clear
        } else if (code >= 1 && code <= 3) {
             weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // Clouds
        } else if (code >= 51 && code <= 67) {
             weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png"; // Rain
        } else {
             weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png"; // Mist/Other
        }

        weatherCard.style.display = "block";

    } catch (error) {
        console.error(error);
        errorMsg.style.display = "block";
    } finally {
        loader.style.display = "none";
    }
}

// Event Listeners
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});