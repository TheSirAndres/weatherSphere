WeatherSphere - Weather Dashboard
Overview
WeatherSphere is a modern, responsive weather dashboard that allows users to search for and view current weather conditions in cities worldwide. With its clean UI, dark/light mode toggle, and API integration, it serves as both a functional weather application and a developer tool for testing weather APIs.

[!NOTE]
Upcoming Features:

Favorite cities functionality

Recent searches history

User registration system

Personalized weather preferences

Features
Current Functionality
City Search: Get weather by city and country

Detailed Weather Display:

Current temperature with min/max values

Weather conditions and description

Wind speed, humidity, pressure, and visibility

API Console: Real-time API request/response display

UI Features:

Dark/Light mode toggle

Responsive design for all devices

Smooth animations and transitions

User Interface:

Login/Registration modals

Favorite cities panel (static)

Recent searches panel (static)

Planned Features
Diagram
Code







Live Demo
https://codesandbox.io/static/img/play-codesandbox.svg

Screenshots
https://via.placeholder.com/800x500/4361ee/ffffff?text=WeatherSphere+Dashboard
https://via.placeholder.com/400x600/1e293b/f0f0f0?text=Dark+Mode+Interface

Installation
To run WeatherSphere locally:

Clone the repository:

bash
git clone https://github.com/your-username/weathersphere.git
cd weathersphere
Open index.html in your browser

(Optional) Add your OpenWeatherMap API key to js/script.js:

javascript
const appID = "your-api-key-here";
Usage
Enter a city name in the search field

Select a country from the dropdown

Click "Get Weather"

View current weather conditions and details

Use the heart icon to favorite locations (upcoming feature)

Toggle between light/dark mode using the moon icon

Technical Details
Tech Stack
Frontend: HTML5, CSS3, JavaScript

API: OpenWeatherMap

Icons: Font Awesome

Fonts: Google Fonts (Poppins, Raleway)

File Structure
text
weathersphere/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
└── README.md
API Integration
javascript
async function fetchWeatherData(city, country) {
  const appID = "your-api-key";
  const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${appID}`;
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}&units=metric`;
  
  // API calls and data processing
}
Contributing
We welcome contributions! Please follow these steps:

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

License
Distributed under the MIT License. See LICENSE for more information.

Contact
Project Maintainer: [Your Name]
Email: your.email@example.com
Project Link: https://github.com/your-username/weathersphere

Acknowledgements
OpenWeatherMap for their free weather API

Font Awesome for the beautiful icons

Google Fonts for the typography

[!IMPORTANT]
Upcoming Development Schedule:

Feature	Expected Completion
User Registration	Q3 2023
Favorite Cities	Q4 2023
Recent Searches	Q1 2024
User Profiles	Q2 2024
WeatherSphere - Your weather, your way. Stay informed in style.
