# The Boma Nairobi - Weather Dashboard

## Overview

A modern weather dashboard for The Boma Nairobi hotel that fetches real-time weather data and forecasts for Nairobi, Kenya using the OpenWeatherMap API.

## Features

✨ **Current Weather Display**
- Real-time temperature, humidity, wind speed, and pressure
- Weather description with emoji icons
- "Feels like" temperature indicator
- Cloud cover percentage

📊 **5-Day Weather Forecast**
- Daily weather predictions
- Temperature trends
- Weather descriptions
- Humidity and wind speed indicators

🎨 **Responsive Design**
- Beautiful gradient backgrounds
- Mobile-friendly interface
- Hover animations and transitions
- Clean, modern UI

🔄 **Auto-Refresh**
- Updates weather data every 10 minutes
- Timestamp of last update

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key (free tier available)

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/ah4094014-create/boma-nairobi-hotel.git
   cd boma-nairobi-hotel
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get OpenWeatherMap API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   - Edit `.env` and add your OpenWeatherMap API key:
   ```
   OPENWEATHER_API_KEY=your_api_key_here
   PORT=3000
   ```

5. **Start the server**
   ```bash
   npm start
   ```
   - For development with auto-reload:
   ```bash
   npm run dev
   ```

6. **Access the dashboard**
   - Open `http://localhost:3000` in your browser

## API Endpoints

### Get Current Weather
```
GET /api/weather/current
```
Returns current weather conditions for Nairobi.

**Response:**
```json
{
  "success": true,
  "city": "Nairobi",
  "temperature": 24.5,
  "feelsLike": 23.8,
  "humidity": 65,
  "pressure": 1013,
  "description": "partly cloudy",
  "icon": "02d",
  "windSpeed": 3.5,
  "cloudiness": 40,
  "timestamp": "2024-09-12T14:30:00.000Z"
}
```

### Get Weather Forecast
```
GET /api/weather/forecast
```
Returns 5-day weather forecast for Nairobi.

**Response:**
```json
{
  "success": true,
  "city": "Nairobi",
  "forecast": [
    {
      "date": "2024-09-12 15:00:00",
      "temperature": 24.5,
      "feelsLike": 23.8,
      "humidity": 65,
      "description": "partly cloudy",
      "icon": "02d",
      "windSpeed": 3.5,
      "precipitation": 0
    },
    ...
  ],
  "timestamp": "2024-09-12T14:30:00.000Z"
}
```

### Health Check
```
GET /api/health
```

## Project Structure

```
boma-nairobi-hotel/
├── server.js              # Express server and API endpoints
├── package.json           # Node.js dependencies
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── README.md             # This file
└── public/
    ├── index.html        # Dashboard HTML
    ├── styles.css        # Dashboard styling
    └── script.js         # Dashboard functionality
```

## Configuration

### Hotel Location
Edit `.env` to change the hotel's coordinates:
```
HOTEL_LAT=-1.3031      # Latitude (Nairobi)
HOTEL_LON=36.7834     # Longitude (Nairobi)
HOTEL_CITY=Nairobi    # City name
```

## Tech Stack

- **Backend:** Express.js
- **API Client:** Axios
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Weather Data:** OpenWeatherMap API
- **Environment:** Node.js

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Troubleshooting

### API Key Issues
- Ensure your OpenWeatherMap API key is correct
- Check that the free tier API limits haven't been exceeded
- API keys may take a few minutes to activate after creation

### CORS Errors
- The server includes CORS headers for cross-origin requests
- Ensure the server is running on the correct port

### Data Not Loading
- Check browser console for error messages (F12)
- Verify the API key in `.env`
- Check that the OpenWeatherMap API is accessible
- Ensure coordinates are correct for the desired location

## Future Enhancements

- [ ] Multiple location support
- [ ] Weather alerts and warnings
- [ ] Historical weather data
- [ ] Guest feedback on weather conditions
- [ ] Integration with hotel booking system
- [ ] Weather-based activity recommendations
- [ ] Mobile app version

## License

MIT License - feel free to use this project for your hotel website.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review OpenWeatherMap API documentation
3. Open an issue on GitHub

## Credits

- Weather data: [OpenWeatherMap](https://openweathermap.org)
- Hotel: The Boma Nairobi
- Icons: Unicode emoji
