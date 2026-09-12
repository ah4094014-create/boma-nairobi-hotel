// Weather Dashboard - Main Script

const API_BASE_URL = '/api/weather';
const WEATHER_ICONS = {
  '01d': '☀️', '01n': '🌙',
  '02d': '⛅', '02n': '🌤️',
  '03d': '☁️', '03n': '☁️',
  '04d': '☁️', '04n': '☁️',
  '09d': '🌧️', '09n': '🌧️',
  '10d': '🌦️', '10n': '🌧️',
  '11d': '⛈️', '11n': '⛈️',
  '13d': '❄️', '13n': '❄️',
  '50d': '🌫️', '50n': '🌫️'
};

/**
 * Fetch and display current weather
 */
async function loadCurrentWeather() {
  try {
    const response = await fetch(`${API_BASE_URL}/current`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch weather data');
    }

    displayCurrentWeather(data);
    updateLastUpdated();
  } catch (error) {
    console.error('Error loading current weather:', error);
    displayError('currentWeather', 'Unable to load current weather data. Please check your API key.');
  }
}

/**
 * Display current weather on the page
 */
function displayCurrentWeather(data) {
  const container = document.getElementById('currentWeather');
  const icon = WEATHER_ICONS[data.icon] || '🌤️';

  const html = `
    <div class="weather-item main">
      <div>
        <div class="weather-icon">${icon}</div>
        <div class="weather-description">${data.description}</div>
      </div>
      <div>
        <div class="temperature-display">${Math.round(data.temperature)}°C</div>
        <div class="weather-label">Feels like ${Math.round(data.feelsLike)}°C</div>
      </div>
    </div>
    <div class="weather-item">
      <div class="weather-label">Humidity</div>
      <div class="weather-value">${data.humidity}%</div>
    </div>
    <div class="weather-item">
      <div class="weather-label">Wind Speed</div>
      <div class="weather-value">${data.windSpeed.toFixed(1)} m/s</div>
    </div>
    <div class="weather-item">
      <div class="weather-label">Pressure</div>
      <div class="weather-value">${data.pressure} hPa</div>
    </div>
    <div class="weather-item">
      <div class="weather-label">Cloud Cover</div>
      <div class="weather-value">${data.cloudiness}%</div>
    </div>
  `;

  container.innerHTML = html;
}

/**
 * Fetch and display weather forecast
 */
async function loadForecast() {
  try {
    const response = await fetch(`${API_BASE_URL}/forecast`);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch forecast data');
    }

    displayForecast(data.forecast);
  } catch (error) {
    console.error('Error loading forecast:', error);
    displayError('forecastContainer', 'Unable to load forecast data.');
  }
}

/**
 * Display weather forecast on the page
 */
function displayForecast(forecast) {
  const container = document.getElementById('forecastContainer');
  
  // Group forecast by day and get one entry per day at noon
  const dailyForecasts = {};
  
  forecast.forEach(item => {
    const date = new Date(item.date);
    const day = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const hour = date.getHours();
    
    // Prefer entries around noon (12:00)
    if (!dailyForecasts[day] || Math.abs(hour - 12) < Math.abs(new Date(dailyForecasts[day].date).getHours() - 12)) {
      dailyForecasts[day] = item;
    }
  });

  const html = Object.entries(dailyForecasts)
    .slice(0, 5) // Show 5 days
    .map(([day, item]) => {
      const icon = WEATHER_ICONS[item.icon] || '🌤️';
      const date = new Date(item.date);
      const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      
      return `
        <div class="forecast-card">
          <div class="forecast-date">${day}</div>
          <div class="forecast-icon">${icon}</div>
          <div class="forecast-temp">${Math.round(item.temperature)}°C</div>
          <div class="forecast-desc">${item.description}</div>
          <div class="forecast-details">
            💧 ${item.humidity}% | 💨 ${item.windSpeed.toFixed(1)} m/s
          </div>
        </div>
      `;
    })
    .join('');

  container.innerHTML = html;
}

/**
 * Display error message
 */
function displayError(elementId, message) {
  const container = document.getElementById(elementId);
  container.innerHTML = `<div class="error">⚠️ ${message}</div>`;
}

/**
 * Update the last updated timestamp
 */
function updateLastUpdated() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  document.getElementById('lastUpdated').textContent = timeString;
}

/**
 * Initialize the dashboard
 */
function initDashboard() {
  console.log('🌤️ Initializing Weather Dashboard...');
  loadCurrentWeather();
  loadForecast();
  
  // Refresh every 10 minutes
  setInterval(() => {
    loadCurrentWeather();
    loadForecast();
  }, 10 * 60 * 1000);
}

// Start the dashboard when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDashboard);
} else {
  initDashboard();
}
