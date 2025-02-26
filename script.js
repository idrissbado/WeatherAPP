// API Key and Base URL for OpenWeatherMap API
const API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const weatherIconElement = document.getElementById('weather-icon');

// Function to fetch weather data
async function fetchWeather(city) {
    try {
        const response = await fetch(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// Function to display weather data
function displayWeather(data) {
    const { name } = data;
    const { temp, humidity } = data.main;
    const { description, icon } = data.weather[0];
    const { speed } = data.wind;

    locationElement.textContent = `Location: ${name}`;
    temperatureElement.textContent = `Temperature: ${temp}°C`;
    descriptionElement.textContent = `Description: ${description}`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
    windSpeedElement.textContent = `Wind Speed: ${speed} m/s`;

    // Set weather icon
    weatherIconElement.innerHTML = `<i class="fas fa-${getWeatherIcon(icon)}"></i>`;
}

// Function to map weather icons
function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': 'sun',
        '01n': 'moon',
        '02d': 'cloud-sun',
        '02n': 'cloud-moon',
        '03d': 'cloud',
        '03n': 'cloud',
        '04d': 'cloud',
        '04n': 'cloud',
        '09d': 'cloud-rain',
        '09n': 'cloud-rain',
        '10d': 'cloud-sun-rain',
        '10n': 'cloud-moon-rain',
        '11d': 'bolt',
        '11n': 'bolt',
        '13d': 'snowflake',
        '13n': 'snowflake',
        '50d': 'smog',
        '50n': 'smog',
    };
    return iconMap[iconCode] || 'question';
}

// Event listener for the search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

// Optional: Fetch weather for a default city on page load
fetchWeather('London');