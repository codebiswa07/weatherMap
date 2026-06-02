require("dotenv").config();

module.exports = {
  port:           process.env.PORT || 5000,
  nodeEnv:        process.env.NODE_ENV || "development",
  mongoUri:       process.env.MONGO_URI || "",
  openWeather: {
    apiKey:  process.env.OPENWEATHER_API_KEY,
    baseUrl: process.env.OPENWEATHER_BASE_URL || "https://api.openweathermap.org/data/2.5",
  },
  cacheTtl:       parseInt(process.env.CACHE_TTL, 10) || 600,
  corsOrigins:    (process.env.CORS_ORIGINS || "http://localhost:3000").split(","),
};
