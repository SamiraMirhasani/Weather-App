function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-name");
  let city = searchInput.value;
  function showCondition(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#date").innerHTML = `${day} ${hours}:${minutes}`;
    celciusTemperature = response.data.main.temp;
    document.querySelector("#temperature").innerHTML =
      Math.round(celciusTemperature);
    document.querySelector("#description").innerHTML =
      response.data.weather[0].description;
    document.querySelector(
      "#humidity"
    ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
    document.querySelector("#wind-speed").innerHTML = `Wind: ${Math.round(
      response.data.wind.speed
    )} km/h`;
    document
      .querySelector("#icon")
      .setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
    document
      .querySelector("#icon")
      .setAttribute("alt", `response.data.weather[0].description`);
    getForecast(response.data.coord);
  }

  let apiKey = "caf1f1c8b723edf56ea35c0626f88b06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCondition);
  console.log(apiUrl);
}
let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
let day = days[now.getDate()];
let form = document.querySelector("#search-city");
form.addEventListener("submit", enterCity);

//Unit Conversion
function ShowcelsiusTemp(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML =
    Math.round(celciusTemperature);
}
function ShowfahrenheitTemp(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(
    (celciusTemperature * 9) / 5 + 32
  );
}
let celciusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", ShowfahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", ShowcelsiusTemp);

//displayForecast();
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(`#forecast`);
  let forecastHTML = `<div class="row"`;
  //let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="card-body">
            <div class="card-title">${formatDay(forecastDay.dt)}</div>
           
            <img
              src="http://openweathermap.org/i,g/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt=""
              id="icon"
              class="weather-icon"
              width="42"
            />
            <div class="weather-temperatures">
              <span class="maxTemp">${Math.round(
                forecastDay.temp.max
              )}°</span> <span class="minTemp">${Math.round(
          forecastDay.temp.min
        )}°</span>
            </div>
          </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "caf1f1c8b723edf56ea35c0626f88b06";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric `;
  axios.get(apiUrl).then(displayForecast);
}
