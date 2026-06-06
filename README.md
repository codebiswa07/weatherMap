# 🌍 WeatherMap — MERN Stack

Interactive world map weather app powered by OpenWeatherMap & Leaflet.
WeatherMap is a modern weather application providing *real-time forecasts, air quality insights, wind conditions, and location-based weather* updates worldwide.


---

**COMPANY**: *CODTECH IT SOLUTION*

**NAME**: *Biswaprakash Sahoo*

**INTERN ID**: *CTIS9533*

**DOMAIN**: *Mern Stack Web Development*

**DURATION**: *6 Weeks*

**MENTOR**: *Neela Santhosh Kumar*

---
#[Preview](https://weather-map-jade.vercel.app/)
<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/9f296155-803d-4294-a371-6fd02a68ad3c" />

<img width="1920" height="1080" alt="Image" src="https://github.com/user-attachments/assets/b2e2f8aa-62a1-4961-bfcb-3a9b6e42690f" /

```bash
# 1. Install all dependencies
npm run install:all


npm run dev
```

## Features
- 🗺  Interactive world map (zoom, pan, click for weather)
- 🌡  Real-time weather by clicking anywhere on the map
- 🛰  Satellite, terrain & dark map tiles
- 🌧  Weather overlay layers (rain, cloud, temp, wind)
- 📈  48-hour forecast chart
- 🔍  City search with live results
- 📜  Search history (stored in MongoDB)
- ⚡  Server-side caching (10 min TTL)
- 📱  Fully responsive

## Project Structure
```
weathermap-app/
├── backend/
│   └── src/
│       ├── config/        # DB & env config
│       ├── controllers/   # Route handlers
│       ├── middlewares/   # Error handler
│       ├── models/        # Mongoose schemas
│       ├── routes/        # Express routers
│       ├── services/      # OWM API calls + cache
│       └── utils/         # Logger & cache helper
└── frontend/
    └── src/
        ├── components/
        │   ├── Map/       # Leaflet world map
        │   ├── Weather/   # Modal, forecast chart
        │   └── UI/        # Navbar
        ├── hooks/         # React Query hooks
        ├── pages/         # Map, Search, History
        ├── services/      # Axios API client
        ├── styles/        # Global CSS
        └── utils/         # Weather helpers
```

## API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/weather/city/:city | Weather by city name |
| GET | /api/weather/coords?lat=&lon= | Weather by coordinates |
| GET | /api/weather/forecast?lat=&lon= | 5-day / 3-hr forecast |
| GET | /api/weather/air-quality?lat=&lon= | Air quality index |
| GET | /api/weather/history | Last 20 searches |
| GET | /api/health | Health check |
#
