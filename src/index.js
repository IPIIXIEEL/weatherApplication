function retrievePosition(position) {
    let apiKey = "3332c3356f67e41032d8159fde794731";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    axios.get(url).then(showWeather);
}

alert("Lets find out the weather in your current location");
navigator.geolocation.getCurrentPosition(retrievePosition);

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
    //console.log(response.data.weather[0].icon);
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
//show fahrenheit conversion and active link
function showF(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp");
    //change active link
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let tempF = (celciusTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(tempF);
}
//show celcius and active link
function showC(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temp");
    //change active link
    fahrenheitLink.classList.remove("active");
    celciusLink.classList.add("active");
    temperatureElement.innerHTML = Math.round(celciusTemp);
}

//global variables
let celciusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showF);

let celciusLink = document.querySelector("#celcius");
celciusLink.addEventListener("click", showC);