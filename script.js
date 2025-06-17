import { countryCityData } from './country_city_list.js';
import { API_KEY } from './config.js';

const url = `https://api.openweathermap.org/data/2.5/...&appid=${API_KEY}`;


console.log(countryCityData["Pakistan"]); // will show cities in Pakistan


        
const countryInput = document.querySelector("#country");
countryInput.addEventListener("input", function () {
  console.log("User is typing country:", this.value);

  //suggestions
     const typed = this.value.toLowerCase();
    const suggestions = Object.keys(countryCityData).filter(c =>
    c.toLowerCase().startsWith(typed));

     const suggestionBox = document.getElementById("country-suggestions");
     suggestionBox.innerHTML = "";
     suggestions.forEach(s => {
     const div = document.createElement("div");
     div.textContent = s;
     div.onclick = () => {
      countryInput.value = s;
      suggestionBox.innerHTML = "";

     };
      suggestionBox.appendChild(div);
    });
});

countryInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // prevent form submission (optional)
    const country = this.value;
    console.log("User pressed Enter. Country:", country);
  }
});

const cityInput = document.querySelector("#city");
cityInput.addEventListener("input", function () {
  console.log("User is typing city:", this.value);
   const country = countryInput.value;
  const cities = countryCityData[country] || [];
  const typed = this.value.toLowerCase();
  const filtered = cities.filter(city => city.toLowerCase().startsWith(typed));

   const cityBox = document.getElementById("city-suggestions");
   cityBox.innerHTML = "";
   filtered.forEach(city => {
     const div = document.createElement("div");
     div.textContent = city;
     div.onclick = () => {
      cityInput.value = city;
      cityBox.innerHTML = "";
    };
    cityBox.appendChild(div);
  });
});

cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // prevent form submission (optional)
    const city = this.value;
    console.log("User pressed Enter. City:", city);
    api_calls(city);
  }
}); 
    //    resolve({country, city}); })
// }
async function api_calls(city) {
    const URL_lon_lan = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&appid=${API_KEY}`;

    let response = await fetch(URL_lon_lan);
    console.log(response);
    let lon_lan_data = await response.json();
    console.log(lon_lan_data);

    const lon = lon_lan_data[0].lon;
    const lat = lon_lan_data[0].lat;

    console.log("lon =", lon);
    console.log("lat =", lat);

    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&appid=${API_KEY}`;
    
    let response2 = await fetch(URL);
    console.log(response2);

    const weather_data = await response2.json();
    console.log(weather_data);

    const temp = weather_data.main.temp;
    const curr_temp = temp - 273.15;
    console.log(curr_temp);
    const feels_like = weather_data.main.feels_like;
    const temp_min = weather_data.main.temp_min;
    const temp_max = weather_data.main.temp_max;
    const pressure = weather_data.main.pressure;
    const humidity = weather_data.main.humidity;
    const sea_level = weather_data.main.sea_level;
    const grnd_level = weather_data.main.grnd_level;
    const wind_speed = weather_data.wind.speed;
    console.log(wind_speed);
    
    const description = weather_data.weather[0].description;
    const icon = weather_data.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    console.log(icon);
    const current_weather_name = weather_data.weather[0].main;

    // setting html elements 

    document.querySelector("#sun-cloud").style.display = "none";
    document.querySelector("#info-box").style.display = "block";

     document.querySelector("#tmp-name").innerHTML += ` ${current_weather_name}`;
     document.querySelector("#tmp-dis").innerHTML += ` ${description}`;
     document.querySelector("#image-tmp").src = iconURL;
     
     
    document.querySelector("#tmpr").innerHTML = `${Math.round(curr_temp)}°C`;
    document.querySelector("#feels-like").innerHTML += ` ${Math.round(feels_like - 273.15)}°C`;
    document.querySelector("#min-temp").innerHTML += ` ${Math.round(temp_min - 273.15)}°C`;
    document.querySelector("#max-temp").innerHTML += ` ${Math.round(temp_max - 273.15)}°C`;
    document.querySelector("#presure").innerHTML += ` ${pressure}`;
    document.querySelector("#humidityy").innerHTML += ` ${humidity}`;
    document.querySelector("#sea-level").innerHTML += ` ${sea_level}`;
    document.querySelector("#ground-level").innerHTML += ` ${grnd_level}`;
    document.querySelector("#wind-speed").innerHTML += ` ${wind_speed}`;

     document.querySelector("#again-btn").style.display = "block";
}

let reset_btn = document.querySelector("#again-btn");
reset_btn.addEventListener('click', () => {
        document.querySelector("#sun-cloud").style.display = "flex";
        // document.querySelector("#cloud-img").style.display = "block";
        document.querySelector("#info-box").style.display = "none";
      document.querySelector("#country").value = "";
      document.querySelector("#city").value = "";

})


