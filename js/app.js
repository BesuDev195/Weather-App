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
      errorDisplay();
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

// I stoped here the city name come again again and in bro code in 29:29 video
function displayWeatherInfo(data) {
   
  // using object destructuring
  const existingWeather = document.querySelector(".weather-info");
  if (existingWeather) {
    existingWeather.remove();
  }
  
  const {
    name: city,
    main: { temp, humidity },
    weather: [{ description, id }],
  } = data;
  
  const cityDisp = document.createElement("h1");
  const iconDisp = document.createElement("p");
  const Tempreaturedisp = document.createElement("h1");
  const humiditydisp = document.createElement("h2");
  const descriptiondisp = document.createElement("p");

 
  cityDisp.textContent = city;
  cityDisp.classList.add("card")
  card.appendChild(cityDisp);


  // console.log(data);
}

function weatherIcon(weatherId) {}

function errorDisplay(message) {
  const iftherisError = document.querySelector(".errorMSG");
  if (iftherisError) {
    iftherisError.remove();
  }

  const error = document.createElement("p");
  error.textContent = message;
  error.classList.add("errorMSG");

  card.appendChild(error);
}
