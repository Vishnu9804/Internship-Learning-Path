const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCard = document.querySelector(".weather");
const errorMsg = document.querySelector(".error");
const loader = document.querySelector(".loader");

async function checkWeather(cityName) {
    weatherCard.style.display = "none";
    errorMsg.style.display = "none";
    loader.style.display = "block";

    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results) {
            throw new Error("City not found");
        }

        const lat = geoData.results[0].latitude;
        const lon = geoData.results[0].longitude;
        const name = geoData.results[0].name; 

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        const current = weatherData.current_weather;

        document.querySelector(".city").innerHTML = name;
        document.querySelector(".temp").innerHTML = Math.round(current.temperature) + "°c";
        document.querySelector(".wind").innerHTML = current.windspeed + " km/h"; 

        const code = current.weathercode;
        
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

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});