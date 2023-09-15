document.addEventListener("DOMContentLoaded", function () {
  function searchCity(city){
    let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showTemperature);

    
  }
  searchCity("London");

  function showWeather(event){
    event.preventDefault();
    let city = document.querySelector("#city-search").value;
    searchCity(city);
    }
    
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", showWeather);

  function formatDate(timeStamp) {
    let date = new Date(timeStamp);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let hours = date.getHours();
      if (hours < 10){
        hours = `0${hours}`;
      }
    let minutes = date.getMinutes();
      if (minutes < 10){
        minutes = `0${minutes}`;
      }
    let day = days[date.getDay()];

    let displayDate = `${day} ${hours}:${minutes}`;
    return displayDate;
  }
  
  function showTemperature(response){
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = 
    Math.round(
      response.data.main.temp
      );

    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = 
    Math.round(
      response.data.wind.speed
      );
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
    document.querySelector("#icon").setAttribute(
      "src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
    document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
    celciusTemperature = response.data.main.temp;

    getForecast(response.data.coord);

  }

  function showFahrenheit(event){
    event.preventDefault();
    //remove the active class for the celcius link
    celciusLink.classList.remove("active");
    //add the active class for the fahrenheit link
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = Math.round((celciusTemperature * 9) / 5 + 32);
    document.querySelector("#temperature").innerHTML = fahrenheitTemperature;
  }

  function showCelcius(event){
    event.preventDefault();
    //remove the active class for the fahrenheit link
    fahrenheitLink.classList.remove("active");
    //add the active class for the celcius link
    celciusLink.classList.add("active");
    document.querySelector("#temperature").innerHTML = Math.round(celciusTemperature);
  }

  let celciusTemperature = null;

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", showFahrenheit);

  let celciusLink = document.querySelector("#celcius-link");
  celciusLink.addEventListener("click", showCelcius);

  function formatDay(time){
    let date = new Date(time*1000);
    let day = date.getDay();
    let days = [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat",
    ];
    return days[day];
  }

  function getForecast(coordinates){
    console.log(coordinates)
    let apiKey = "535cacbb3f8a0df0aeb4790235b9541f";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(showForecast);

  }

  function showForecast(result){
    console.log(result.data)
    let forecast = result.data.daily;
    let forecastElement = document.querySelector("#weather-forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forcastDay, index) {
      if (index < 6){
      forecastHTML = forecastHTML + `
        
        <div class="col-2">
          <div class="weather-forecast-date">
            ${formatDay(forcastDay.dt)}
          </div>    
          <img 
          src="https://openweathermap.org/img/wn/${forcastDay.weather[0].icon}@2x.png" 
          alt="" 
          width="42"
          />
          <div class="weather-forecast-temperature">
              <span class="weather-forecast-temperature-max">
                  ${Math.round(forcastDay.temp.max)}°
              </span>
              <span class="weather-forecast-temperature-min">
                  ${Math.round(forcastDay.temp.min)}°
              </span>
          </div>
        </div>
        
      `;
      }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
  
  
});