let now = new Date();
let h3 = document.querySelector("h3");
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = now.getMinutes();
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
    "Saturday"
];
let day = days[now.getDay()];

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
    "December"
];
let month = months[now.getMonth()];

h3.innerHTML = `Your local day and time is ${day}  ${hours}:${minutes}`;

//current weather retrieve and show

function retrievePosition(position) {
    let apiKey = "3332c3356f67e41032d8159fde794731";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    console.log(position);
    axios.get(url).then(showWeather);
}

function getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(retrievePosition);
}
let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

// update from serch form
function showWeather(response) {
    let h1 = document.querySelector("h1");
    h1.innerHTML = `${response.data.name}`;
    let h2 = document.querySelector("h2");
    let tempNow = Math.round(response.data.main.temp);
    h2.innerHTML = `It is ${tempNow}°C in ${response.data.name} right now `;
    let tempMin = document.querySelector("#low");
    tempMin.innerHTML = `${response.data.main.temp_min}°C`;
    let tempMax = document.querySelector("#high");
    tempMax.innerHTML = `${response.data.main.temp_max}°C`;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${response.data.main.humidity}%`;
}

function searchForm(event) {
    event.preventDefault();

    let city = document.querySelector("#city").value;
    if (city !== "") {
        let apiKey = "3332c3356f67e41032d8159fde794731";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        axios.get(url).then(showWeather);
    }
}

let form = document.querySelector(`#citySearch-form`);
form.addEventListener("submit", searchForm);