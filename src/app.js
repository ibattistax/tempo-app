function unitToggle() {
  let temperature = Math.round(response.data.temperature.current);
}

function refreshWeather(response) {
  //select and define elements
  let temperatureElement = document.querySelector("#temperature");
  let cityDisplayElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");

  //define API variables
  let temperature = Math.round(response.data.temperature.current);
  let description = response.data.condition.description;
  let humidity = Math.round(response.data.temperature.humidity);
  let date = new Date(response.data.time * 1000);

  //change innerHTML to display API response
  temperatureElement.innerHTML = temperature;
  cityDisplayElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = `${humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  timeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  } else if ((minutes = 0)) {
    minutes = `00${minutes}`;
  }

  return `${day} | ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "oaff0b06238ce15e1bda3c4dt5f4a7ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
} //make an epi call and update interface

function changeCitySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");
  console.log(searchInput.value);
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", changeCitySearch);

searchCity("London");
