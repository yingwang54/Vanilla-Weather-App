let now = new Date();
let date = now.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];
let year = now.getFullYear();
let currentDate = document.querySelector("#real-date");
currentDate.innerHTML = `${date} ${month}, ${year}  ${day}`;

let hour = now.getHours();
let minute = now.getMinutes();
let timezone = now.getTimezoneOffset();
let gmtTimezone = timezone / 60;
let currentTime = document.querySelector("#current-time");
if (minute < 10) {
  minute = `0${now.getMinutes()}`;
}
if (hour < 10) {
  hour = `0${now.getHours()}`;
}
currentTime.innerHTML = `${hour}:${minute}  GMT ${gmtTimezone}`;

let cityName=null;
let cityInput = document.querySelector("#city-input");

function showCelTemp(response) {
cityName = response.data.name;
cityInput.innerHTML = `${cityName}`;
  let tempCel = Math.round(response.data.main.temp);
  degree=response.data.main.temp;
  let degreeCel = document.querySelector("#cel");
  degreeCel.innerHTML = `${tempCel}`;
  let weatherDescription = response.data.weather[0].description;
  let description = document.querySelector("#description");
  description.innerHTML = `${weatherDescription}`;
  let weatherWind = response.data.wind.speed;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${Math.round(weatherWind * 18) / 5} km/h`;
  let weatherHumidity = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${weatherHumidity}%`;
  let iconElement=document.querySelector("#icon");
  iconElement.setAttribute(
    "src", `http://openweathermap.org/img/wn/${
      response.data.weather[0].icon
    }@2x.png`);
    iconElement.setAttribute(
      "alt", 
        response.data.weather[0].description);
        console.log(response.data)
       showForecast(response.data.coord);
}

function showForecast(coordinates){
  let apiKey = "f75c6779ae980097755ff7503f54fb9c";
  let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="Date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="52"
        />
        <div class="Tempforecast">
           ${Math.round(
            forecastDay.temp.max)}°C  ${Math.round(forecastDay.temp.min )}°C 
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");

  
  if (searchInput.value) {
  
    let apiKey = "f75c6779ae980097755ff7503f54fb9c";
    let city = searchInput.value;

    let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(`${apiUrl1}&appid=${apiKey}`).then(showCelTemp);
  } else {
    cityInput.innerHTML = "Please enter a city";
  }
}

let search = document.querySelector("#search-button");
search.addEventListener("click", searchCity);

function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let h1 = document.querySelector("#city-input");
  h1.innerHTML = `Current location: ${Math.round(lat)}(lat);${Math.round(
    lon
  )}(lon).`;
  let apiKey = "f75c6779ae980097755ff7503f54fb9c";
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl2}&appid=${apiKey}`).then(showCelTemp);
}

let searchPosition = document.querySelector("#find-button");
searchPosition.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(getPosition)
);

//Bonus
let celDegree = document.querySelector("#cel");
let fahDegree = document.querySelector("#fah");
let degree = null;
let fah = document.querySelector("#fah-click");
let cel = document.querySelector("#cel-click");

function clickFah(event) {
  event.preventDefault();
  fah.innerHTML = "°F";
  cel.innerHTML = "to °C";
  fahDegree.innerHTML = Math.round((degree * 9) / 5 + 32);
  celDegree.innerHTML = "";
}

fah.addEventListener("click", clickFah);

function clickCel(event) {
  event.preventDefault();
  fah.innerHTML = "to °F";
  cel.innerHTML = "°C";
  fahDegree.innerHTML = "";

  celDegree.innerHTML = Math.round(degree * 1);
}

cel.addEventListener("click", clickCel);

