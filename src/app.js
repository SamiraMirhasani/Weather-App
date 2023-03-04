//Feature 1

//feature 2
function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-name");
  let city = searchInput.value;

  function showCondition(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#date").innerHTML = `${day} ${hours}:${minutes}`;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
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
//API
