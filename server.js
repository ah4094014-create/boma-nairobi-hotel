import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Weather API configuration
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const HOTEL_LAT = process.env.HOTEL_LAT || -1.3031; // Nairobi
const HOTEL_LON = process.env.HOTEL_LON || 36.7834;
const HOTEL_CITY = process.env.HOTEL_CITY || 'Nairobi';

/**
 * Fetch current weather data from OpenWeatherMap API
 */
app.get('/api/weather/current', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat: HOTEL_LAT,
          lon: HOTEL_LON,
          appid: OPENWEATHER_API_KEY,
          units: 'metric'
        }
      }
    );

    const data = response.data;
    res.json({
      success: true,
      city: data.name,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      cloudiness: data.clouds.all,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weather API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch current weather data',
      message: error.message
    });
  }
});

/**
 * Fetch 5-day weather forecast from OpenWeatherMap API
 */
app.get('/api/weather/forecast', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          lat: HOTEL_LAT,
          lon: HOTEL_LON,
          appid: OPENWEATHER_API_KEY,
          units: 'metric'
        }
      }
    );

    const data = response.data;
    const forecast = data.list.map(item => ({
      date: item.dt_txt,
      temperature: item.main.temp,
      feelsLike: item.main.feels_like,
      humidity: item.main.humidity,
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      windSpeed: item.wind.speed,
      precipitation: item.rain ? item.rain['3h'] : 0
    }));

    res.json({
      success: true,
      city: data.city.name,
      forecast: forecast,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Weather Forecast API Error:', error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch weather forecast',
      message: error.message
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Boma Nairobi Weather Dashboard',
    timestamp: new Date().toISOString()
  });
});

/**
 * Serve the dashboard
 */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🌤️  Weather Dashboard Server Running`);
  console.log(`📍 Hotel: ${HOTEL_CITY}`);
  console.log(`🌐 Server: http://localhost:${PORT}`);
  console.log(`📊 API endpoints available at http://localhost:${PORT}/api/weather/*\n`);
});
