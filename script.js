// const apiKey = "6e4cdb191723e056f34a38e06d3b4de2";

// async function getWeather() {
//   const location = document.getElementById("location-input").value;
//   const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;

//   try {
//     const response = await fetch(apiUrl);
//     if (!response.ok) throw new Error("Location not found");
    
//     const data = await response.json();
//     displayWeather(data, "search-weather-info");
//   } catch (error) {
//     alert("Could not fetch weather data. Please try another location.");
//   }
// }

// function displayWeather(data, elementId) {
//   const element = document.getElementById(elementId);
//   const temperature = data.current.temperature;
//   const weatherDesc = data.current.weather_descriptions[0];
//   const humidity = data.current.humidity;
//   const windSpeed = data.current.wind_speed;
//   const iconUrl = data.current.weather_icons[0];

//   element.innerHTML = `
//     <h2>${data.location.name}</h2>
//     <img src="${iconUrl}" alt="${weatherDesc} icon"/>
//     <p><strong>Temperature:</strong> ${temperature} °C</p>
//     <p><strong>Weather:</strong> ${weatherDesc}</p>
//     <p><strong>Humidity:</strong> ${humidity}%</p>
//     <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
//   `;
//   element.classList.remove("hidden");
// }

// async function loadDefaultCities() {
//   const cities = ["Delhi", "Punjab", "Bangalore"];
  
//   cities.forEach(async (city) => {
//     const apiUrl = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`;
//     const elementId = `city-${city.toLowerCase()}`;
    
//     try {
//       const response = await fetch(apiUrl);
//       if (!response.ok) throw new Error("City not found");
      
//       const data = await response.json();
//       displayWeather(data, elementId);
//     } catch (error) {
//       console.error(`Could not load weather for ${city}:`, error);
//     }
//   });
// }

// window.onload = loadDefaultCities;

const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const cityName = document.querySelector('.cityInfo');
const weather_body = document.querySelector('.weather-body');
async function checkWeather(city){
    const api_key = "8b99dfb836c316b2071f48ede4191bc1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(`${url}`).then(response => response.json());
    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }
    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    cityName.innerHTML = `${weather_data.name}`;
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weather_img.src = "images/cloudy.png";
            break;
        case 'Clear':
            weather_img.src = "images/sunny.png";
            break;
        case 'Rain':
            weather_img.src = "images/rainy.png";
            break;
        case 'Mist':
            weather_img.src = "images/misty.png";
            break;
        case 'Snow':
            weather_img.src = "images/snowy.png";
            break;
    }
    console.log(weather_data);
}
searchBtn.addEventListener('click', ()=>{
    checkWeather(inputBox.value);
});