function retrievePosition(position) {
    let apiKey = "3332c3356f67e41032d8159fde794731";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    axios.get(url).then(showWeather);
    navigator.geolocation.getCurrentPosition(retrievePosition);
}

//update timestamp
function formatDate(timestamp) {
    //calculate the data
    let date = new Date(timestamp);
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
        "Sunday"
    ];
    let day = days[date.getDay()];
    return ` ${day} ${hours}:${minutes}`;
}

//forecastContainerUpdate
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecastDay, index) {
        if (index < 6) {
            forecastHTML =
                forecastHTML +
                `<div class="col-sm-2">
                                <div class="card text-dark bg-warning mb-3" >
                                    <div class="weather-forecast-date">${formatDay(
                                      forecastDay.dt
                                    )}</div>
                                    <div class="weather-forecast-temp" >
                                        <span id="weather-forecast-min">${Math.round(
                                          forecastDay.temp.max
                                        )}°C</span>
                                        <span id="weather-forecast-max">${Math.round(
                                          forecastDay.temp.min
                                        )}°C </span>
                                        <img src="http://openweathermap.org/img/wn/${
                                          forecastDay.weather[0].icon
                                        }@2x.png" id="icon" alt="sun" />
                                    </div>
                                </div>
                            </div>`;
        }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "3332c3356f67e41032d8159fde794731";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(displayForecast);
}

//show weather
function showWeather(response) {
    let temperatureElement = document.querySelector("#temp");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let windElement = document.querySelector("#wind");
    let humiElement = document.querySelector("#humi");
    let dtElement = document.querySelector("#dt");
    let iconImage = document.querySelector("#icon");

    celciusTemp = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(celciusTemp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
    humiElement.innerHTML = `${response.data.main.humidity}%`;
    dtElement.innerHTML = `Last Updated ${formatDate(response.data.dt * 1000)}`;
    iconImage.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconImage.setAttribute("alt", `${response.data.weather[0].description}`);

    getForecast(response.data.coord);
}
//show weather of city search
function search(city) {
    let apiKey = "3332c3356f67e41032d8159fde794731";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
}
//grab city from form search submit
function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

//global variables

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);