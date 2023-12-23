function changeCitySearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#form-input");
  console.log(searchInput.value);
  let cityDisplayElement = document.querySelector("#city");
  cityDisplayElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", changeCitySearch);
