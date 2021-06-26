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
function showCelTemp(response) {
  let tempCel = Math.round(response.data.main.temp);
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
}
function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");

  let cityInput = document.querySelector("#city-input");
  if (searchInput.value) {
    cityInput.innerHTML = `${searchInput.value}`;
    let apiKey = "f75c6779ae980097755ff7503f54fb9c";
    let city = searchInput.value;

    let apiUrl1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(`${apiUrl1}&appid=${apiKey}`).then(showCelTemp);
  } else {
    cityInput.innerHTML = "Enter a city below";
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
let degree = celDegree.innerHTML;
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
