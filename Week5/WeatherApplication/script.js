const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCard = document.querySelector(".weather");
const errorMsg = document.querySelector(".error");
const loader = document.querySelector(".loader");
const body = document.querySelector("body"); // Select body to change background

async function checkWeather(cityName) {
    // 1. Reset UI
    weatherCard.style.display = "none";
    errorMsg.style.display = "none";
    loader.style.display = "block";

    try {
        // STEP 1: Get Coordinates
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

        // STEP 2: Get Weather
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        // STEP 3: Update UI
        const current = weatherData.current;
        console.log("Read This :", current);

        document.querySelector(".city").innerHTML = name;
        document.querySelector(".temp").innerHTML = Math.round(current.temperature_2m) + "°c";
        document.querySelector(".wind").innerHTML = current.wind_speed_10m + " km/h"; 
        document.querySelector(".humidity").innerHTML = current.relative_humidity_2m + "%";
        
        // precise variable: weather_code
        const code = current.weather_code;
        
        // --- BACKGROUND & ICON LOGIC ---
        // 1. Remove all old weather classes
        body.className = ""; 

        if (code === 0) {
             weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png"; // Clear
             body.classList.add("clear"); // Bright Blue Gradient
        } 
        else if (code >= 1 && code <= 3) {
             weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png"; // Clouds
             body.classList.add("clouds"); // Grey Gradient
        } 
        else if (code >= 51 && code <= 67 || (code >= 80 && code <= 82)) {
             weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/1163/1163657.png"; // Rain
             body.classList.add("rain"); // Dark + Rain Animation
        } 
        else if (code >= 71 && code <= 77 || (code >= 85 && code <= 86)) {
            // Added SNOW Logic
            weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/2315/2315309.png"; // Snowflake
            body.classList.add("snow"); // Light Blue + Snow Animation
        }
        else {
             weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/4005/4005901.png"; // Mist/Other
             body.classList.add("mist"); // Hazy Gradient
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