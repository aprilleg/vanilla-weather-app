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

function displayForecast() {
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thur"];
  days.forEach(function(day){
    forecastHTML =
      forecastHTML +
      `
                    <div class="col-2">
                      <div class="weather-forecast-date">${day}</div>
                      <img
                        src="https://ssl.gstatic.com/onebox/weather/64/sunny.png"
                        alt=""
                        width="24"
                      />
                      <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temperature-max">
                          18°
                        </span>
                        <span class="weather-forecast-temperature-min">
                          12°
                        </span>
                      </div>
                  </div>`;

  });
  
  forecastHTML = forecastHTML + `</div>`;

  forecast.innerHTML = forecastHTML;
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

displayForecast();
