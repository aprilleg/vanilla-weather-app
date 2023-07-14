function displayTemperature(response) {
    console.log(response.data);
    let city = document.querySelector("#city");
    let temperature = document.querySelector("#temperature");
    let description = document.querySelector("#description");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");

    city.innerHTML = response.data.name;
    temperature.innerHTML = Math.round(response.data.main.temp);
    description.innerHTML = response.data.weather[0].description; 
    humidity.innerHTML = response.data.main.humidity;
    wind.innerHTML = Math.round(response.data.wind.speed);

}

let apiKey = "4701c6238d7532c7377eeddfdc5b837d";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Philippines&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemperature);
