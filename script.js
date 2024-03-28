// Fetch data from Rest Countries API
fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {
    const countryContainer = document.getElementById('countryContainer');
    data.forEach(country => {
      const card = createCountryCard(country);
      countryContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching countries:', error));

// Create Bootstrap card for each country
function createCountryCard(country) {
  const card = document.createElement('div');
  card.className = 'col-lg-4 col-sm-12';

  const cardHtml = `
    <div class="card">
      <div class="card-header">${country.capital}</div>
      <div class="card-body">
        <h5 class="card-title">${country.name.common}</h5>
        <p class="card-text">Region: ${country.region}</p>
        <p class="card-text">Latlng: ${country.latlng}</p>
        <img src="${country.flags.png}" class="card-img-top" alt="Flag">
        <button class="btn btn-primary" onclick="getWeather('${country.name.common}')">Click for Weather</button>
      </div>
    </div>
  `;
  card.innerHTML = cardHtml;
  return card;
}

// Fetch weather data from OpenWeatherMap API
function getWeather(countryName) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${countryName}&appid=YOUR_API_KEY&units=metric`)
    .then(response => response.json())
    .then(data => {
      const weatherInfo = `
        Current Weather: ${data.weather[0].description}<br>
        Temperature: ${data.main.temp}°C<br>
        Humidity: ${data.main.humidity}%
      `;
      alert(weatherInfo);
    })
    .catch(error => console.error('Error fetching weather:', error));
}
