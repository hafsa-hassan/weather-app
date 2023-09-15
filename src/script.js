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

  }

  
  

});