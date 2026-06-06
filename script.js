const searchButton = document.querySelector("#search-button");
const searchBar = document.querySelector("#search");
const weatherInfo = document.querySelector("#weather-info");
const errorMessage = document.querySelector("#error-message");
const loadingMessage = document.querySelector("#loading-text");
loadingMessage.textContent = "Loading...";
loadingMessage.style.display = "none";

async function getWeatherData(searchTerm) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchTerm}?key=YU38RHB4WDZ6ZFVUAMMTNXHLN&unitGroup=metric`,
    );
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.log(error);
    errorMessage.textContent = "City Not Found !!!";
  }
}

function processWeatherData(data) {
  const address = data.address;
  const description = data.description;
  const currentConditions = {
    temp: data.currentConditions.temp,
    condition: data.currentConditions.conditions,
    datetime: data.currentConditions.datetime,
    feelslike: data.currentConditions.feelslike,
    humidity: data.currentConditions.humidity,
    icon: data.currentConditions.icon,
    dew: data.currentConditions.dew,
    sunrise: data.currentConditions.sunrise,
    sunset: data.currentConditions.sunset,
    uvindex: data.currentConditions.uvindex,
    visibility: data.currentConditions.visibility,
    winddir: data.currentConditions.winddir,
    windspeed: data.currentConditions.windspeed,
  };
  const timezone = data.timezone;
  const days = data.days;
  return { address, description, alerts, currentConditions, timezone, days };
}

function displayWeatherData(display) {
  weatherInfo.replaceChildren();
  errorMessage.textContent = "";

  function createText(label, text) {
    const para = document.createElement("p");
    para.textContent = `${label}: ${text}`;
    weatherInfo.appendChild(para);
    return para;
  }
  createText("Address", display.address);
  createText("Description", display.description);
  createText("Temperature", `${display.currentConditions.temp} °C`);
  createText("Condition", display.currentConditions.condition);
  createText("Date Time", display.currentConditions.datetime);
  createText("Feels Like", `${display.currentConditions.feelslike} °C`);
  createText("Humidity", `${display.currentConditions.humidity} %`);
  createText("Icon", display.currentConditions.icon);
  createText("Dew Point", `${display.currentConditions.dew} °C`);
  createText("Sunrise", display.currentConditions.sunrise);
  createText("Sunset", display.currentConditions.sunset);
  createText("UV Index", display.currentConditions.uvindex);
  createText("Visibility", `${display.currentConditions.visibility} km`);
  createText("Wind Direction", display.currentConditions.winddir);
  createText("Wind Speed", `${display.currentConditions.windspeed} km/h`);
  createText("Timezone", display.timezone);
}

searchButton.addEventListener("click", async (event) => {
  event.preventDefault();
  loadingMessage.style.display = "flex";
  weatherInfo.replaceChildren();
  let searchTerm = searchBar.value;
  let newSearchTerm =
    searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1).toLowerCase();
  const data = await getWeatherData(newSearchTerm);
  loadingMessage.style.display = "none";
  if (!data) return;
  const display = processWeatherData(data);
  displayWeatherData(display);
});
