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
