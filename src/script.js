function formatDate(timestamp) {
  let date = new Date(timestamp);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let today = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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

  return `${month} ${today}, ${year} | ${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day =date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];

}


function displayForecast(response) {
  let forecastW = response.data.daily;

  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecastW.forEach(function (forecastDay, index) {
    if (index < 6) {
    forecastHTML =
      forecastHTML +
      `
                    <div class="col-2">
                      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div> 
                      <img
                        src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                        alt=""
                        width="24"
                      />
                      <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max">
                          ${Math.round(forecastDay.temp.max)}°
                        </span>
                        <span class="weather-forecast-temperature-min">
                          ${Math.round(forecastDay.temp.min)}°
                        </span>
                      </div>
                  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecast.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "ca0db41e2e878c74a1dfc7ffece370d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let date = document.querySelector("#date");
  let icon = document.querySelector("#icon");

  city.innerHTML = response.data.name;
  temperature.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
  icon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function search(city) {
  let apiKey = "4701c6238d7532c7377eeddfdc5b837d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function clickSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  search(cityInput.value);
}

search("Philippines");

let form = document.querySelector("#search-form");
form.addEventListener("submit", clickSubmit);
