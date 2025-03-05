const weathForm = document.querySelector(".weatherForm");
const input = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "4447ade6123ba9fdc2f9bc01aad832c1";

weathForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const city = input.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.log(error);
      errorDisplay("could not find city data");
    }
  } else {
    errorDisplay("please enter the city");
  }
});

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error("could not find city data");
    
  }
  return await response.json();
}

function displayWeatherInfo(data) {
  // using object destructuring
  card.innerHTML = "";

  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;

  const cityDisp = document.createElement("h1");
  const iconDisp = document.createElement("p");
  const Tempreaturedisp = document.createElement("h1");
  const humiditydisp = document.createElement("h2");
  const descriptiondisp = document.createElement("h2");

  cityDisp.textContent = city;
  card.appendChild(cityDisp);

  iconDisp.textContent = weatherIcon(id);
  card.appendChild(iconDisp);
  iconDisp.classList.add("weatherIcon")

  Tempreaturedisp.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  card.appendChild(Tempreaturedisp);

  humiditydisp.textContent = `humidity=${humidity}%`;
  card.appendChild(humiditydisp);

  descriptiondisp.textContent = `Info:-${description}`;
  card.appendChild(descriptiondisp);


}

function weatherIcon(weatherId) {
  switch (true) {
    case (weatherId >= 200 && weatherId < 300):
      return "⛈️";
    case (weatherId >= 300 && weatherId < 500):
      return "🌧️";
    case (weatherId >= 500 && weatherId < 600):
      return "🌧️";
    case (weatherId >= 600 && weatherId < 700):
      return "❄️";
    case (weatherId >= 700 && weatherId < 800):
      return "🍃";
    case (weatherId === 800):
      return "☀️";
    case (weatherId >= 801 && weatherId < 810):
      return "☁️";
    default:
      return "?";
  }
}

function errorDisplay(message) {
  card.innerHTML=""
  const iftherisError = document.querySelector(".errorMSG");
  if (iftherisError) {
    iftherisError.remove();
  }

  const error = document.createElement("p");
  error.textContent = message;
  error.classList.add("errorMSG");

  card.appendChild(error);
}
