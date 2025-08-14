// DOM Elements
const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");
const mobileToggle = document.getElementById("mobile-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const mobileOverlay = document.getElementById("mobile-overlay");
const mobileThemeToggle = document.querySelector(".mobile-theme-toggle");
const loginBtn = document.getElementById("login-btn");
const registerBtn = document.getElementById("register-btn");
const mobileLoginBtn = document.getElementById("mobile-login-btn");
const mobileRegisterBtn = document.getElementById("mobile-register-btn");
const loginModal = document.getElementById("login-modal");
const registerModal = document.getElementById("register-modal");
const closeModalBtns = document.querySelectorAll(".close-modal");
const switchToRegister = document.getElementById("switch-to-register");
const switchToLogin = document.getElementById("switch-to-login");
const searchBtn = document.getElementById("search-btn");
const favoriteBtns = document.querySelectorAll(".favorite-btn");
const removeBtns = document.querySelectorAll(".remove-btn");

// API Console and Endpoint Info
const APIConsole = document.getElementsByClassName("response-display");
const APIEndPoint = document.getElementsByClassName("endpoint-info");

// Weather display elements
const cityName = document.querySelector(".city-name");
const weatherDescription = document.querySelector(".weather-description");
const weatherIcon = document.querySelector(".weather-icon img");
const tempMain = document.querySelector(".temp-main");
const tempMin = document.querySelector(".temp-minmax :nth-child(2) p");
const tempMax = document.querySelector(".temp-minmax :nth-child(1) p");
const windSpeed = document.querySelector(
  ".weather-details :nth-child(1) :nth-child(3)"
);
const humidity = document.querySelector(
  ".weather-details :nth-child(2) :nth-child(3)"
);
const pressure = document.querySelector(
  ".weather-details :nth-child(3) :nth-child(3)"
);
const visibility = document.querySelector(
  ".weather-details :nth-child(4) :nth-child(3)"
);

// Website Initialization
document.querySelectorAll(".fade-in").forEach((el) => {
  el.style.opacity = "0";
});

setTimeout(() => {
  document.querySelectorAll(".fade-in").forEach((el, index) => {
    setTimeout(() => {
      el.style.opacity = "1";
    }, 150 * index);
  });
}, 100);

// Theme Toggle
themeToggle.addEventListener("click", toggleTheme);
mobileThemeToggle.addEventListener("click", toggleTheme);

function toggleTheme() {
  currentTheme = body.classList.contains("dark-mode") ? "light" : "dark";
  localStorage.setItem("theme", currentTheme);
  body.classList.toggle("dark-mode");
  const icon = themeToggle.querySelector("i");
  const mobileIcon = mobileThemeToggle.querySelector("i");

  if (body.classList.contains("dark-mode")) {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
    mobileIcon.classList.remove("fa-moon");
    mobileIcon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
    mobileIcon.classList.remove("fa-sun");
    mobileIcon.classList.add("fa-moon");
  }
}

// Load saved theme
let currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "dark") {
  body.classList.add("dark-mode");
  themeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
  mobileThemeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
}

// Mobile Navigation
mobileToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  mobileOverlay.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

mobileOverlay.addEventListener("click", () => {
  mobileMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

// Modal Controls
loginBtn.addEventListener("click", () => {
  loginModal.classList.add("active");
});

registerBtn.addEventListener("click", () => {
  registerModal.classList.add("active");
});

mobileLoginBtn.addEventListener("click", () => {
  loginModal.classList.add("active");
  mobileMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");
});

mobileRegisterBtn.addEventListener("click", () => {
  registerModal.classList.add("active");
  mobileMenu.classList.remove("active");
  mobileOverlay.classList.remove("active");
});

closeModalBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    loginModal.classList.remove("active");
    registerModal.classList.remove("active");
  });
});

switchToRegister.addEventListener("click", (e) => {
  e.preventDefault();
  loginModal.classList.remove("active");
  registerModal.classList.add("active");
});

switchToLogin.addEventListener("click", (e) => {
  e.preventDefault();
  registerModal.classList.remove("active");
  loginModal.classList.add("active");
});

// Close modals when clicking outside
[loginModal, registerModal].forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
});

// Notification function
function showNotification(message, type = "success") {
  const existing = document.querySelector(".notification");
  if (existing) existing.remove();

  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        background: ${type === "error" ? "#ff6b6b" : "#06d6a0"};
        color: white;
        font-weight: 500;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        z-index: 2000;
        transform: translateX(200%);
        transition: transform 0.3s ease;
      `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 10);

  setTimeout(() => {
    notification.style.transform = "translateX(200%)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Weather Search Functionality
async function fetchWeatherData(city, country) {
  const appID = "3ad5584f3d2ecffc027b02ce52d5b18c";

  // 1. Get geolocation data
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${appID}`;
  const geoResponse = await fetch(geoUrl);
  const geoData = await geoResponse.json();

  if (!geoData.length) {
    showNotification("City not found!", "error");
    throw new Error("City not found");
  }

  // 2. get weather data
  const { lat, lon } = geoData[0];
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}&units=metric`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  // 3. Update console UI and return data
  showNotification(
    `Weather data for ${city}, ${country} fetched successfully!`
  );
  APIConsole[0].textContent = JSON.stringify(weatherData, null, 2);
  APIEndPoint[0].textContent = weatherUrl;

  return weatherData;
}

// Update weather display
function updateWeatherDisplay(weatherData) {
  cityName.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
  weatherDescription.textContent = weatherData.weather[0].main;
  weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  tempMain.textContent = `${Math.round(weatherData.main.temp)}°C`;
  tempMin.textContent = `${Math.round(weatherData.main.temp_min)}°C`;
  tempMax.textContent = `${Math.round(weatherData.main.temp_max)}°C`;
  windSpeed.textContent = `${Math.round(weatherData.wind.speed)} Km/h`;
  humidity.textContent = `${weatherData.main.humidity}%`;
  pressure.textContent = `${weatherData.main.pressure} hPa`;
  visibility.textContent = `${(weatherData.visibility / 1000).toFixed(1)} Km`;
}

// Initialize weather search with default values
window.addEventListener("DOMContentLoaded", async () => {
  try {
    let weatherValue = await fetchWeatherData("New York", "US");
    updateWeatherDisplay(weatherValue);
  } catch (error) {
    console.error("Error fetching weather:", error);
  }
});

// Search Weather
searchBtn.addEventListener("click", () => {
  const cityInput = document.getElementById("city");
  const countrySelect = document.getElementById("country");

  if (cityInput.value.trim() === "") {
    showNotification("Please enter a city name!", "error");
    return;
  }

  const city = cityInput.value.trim();
  const country = countrySelect.value;

  fetchWeatherData(city, country)
    .then((weatherData) => {
      updateWeatherDisplay(weatherData);
    })
    .catch((error) => {
      console.error("Error fetching weather:", error);
      showNotification("Failed to fetch weather data!", "error");
    });
});

// Favorite Button
favoriteBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const icon = btn.querySelector("i");
    btn.classList.toggle("active");

    if (btn.classList.contains("active")) {
      icon.classList.remove("far");
      icon.classList.add("fas");
      showNotification("City added to favorites!");
    } else {
      icon.classList.remove("fas");
      icon.classList.add("far");
      showNotification("City removed from favorites!");
    }
  });
});

// Remove Favorite
removeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".favorite-item");
    item.style.opacity = "0";
    setTimeout(() => {
      item.remove();
    }, 300);
  });
});
