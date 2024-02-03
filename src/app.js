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
  let iconElement = document.querySelector("#icon");

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
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minute = date.getMinutes();
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

  if (minute < 10) {
    minute = `0${minute}`; // format minutes as :08 instead of :8
  } else if (minute == 0) {
    minute = `00`; // format minutes as 9:00 instead of 9:0
  }

  return `${day} | ${hours}:${minute}`;
}

function searchCity(city) {
  let apiKey = "oaff0b06238ce15e1bda3c4dt5f4a7ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
} //make an api call and update interface

function changeCitySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "oaff0b06238ce15e1bda3c4dt5f4a7ba";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
  <div class="col-2">
    <span class="forecast-date">${formatDay(day.time)}</span>
    <img
      src="${day.condition.icon_url}"
      class="forecast-icon"
    />
    <span class="forecast-temp-max">${Math.round(
      day.temperature.maximum
    )}º</span>
    <span class="forecast-temp-min">${Math.round(
      day.temperature.minimum
    )}º</span>
  </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", changeCitySearch);

searchCity("Paris");
