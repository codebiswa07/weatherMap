const axios = require("axios");
const { openWeather } = require("../config");
const { getOrSet } = require("../utils/cache");
const logger = require("../utils/logger");

const owClient = axios.create({ baseURL: openWeather.baseUrl });

const addKey = (params = {}) => ({ ...params, appid: openWeather.apiKey, units: "metric" });

const weatherService = {
  async getByCity(city) {
    return getOrSet(`city:${city.toLowerCase()}`, async () => {
      const { data } = await owClient.get("/weather", { params: addKey({ q: city }) });
      logger.debug(`Fetched weather for city: ${city}`);
      return data;
    });
  },

  async getByCoords(lat, lon) {
    const key = `coords:${parseFloat(lat).toFixed(2)},${parseFloat(lon).toFixed(2)}`;
    return getOrSet(key, async () => {
      const { data } = await owClient.get("/weather", { params: addKey({ lat, lon }) });
      logger.debug(`Fetched weather for coords: ${lat},${lon}`);
      return data;
    });
  },

  async getForecast(lat, lon) {
    const key = `forecast:${parseFloat(lat).toFixed(2)},${parseFloat(lon).toFixed(2)}`;
    return getOrSet(key, async () => {
      const { data } = await owClient.get("/forecast", { params: addKey({ lat, lon, cnt: 40 }) });
      logger.debug(`Fetched forecast for coords: ${lat},${lon}`);
      return data;
    });
  },

  async getAirQuality(lat, lon) {
    const key = `air:${parseFloat(lat).toFixed(2)},${parseFloat(lon).toFixed(2)}`;
    return getOrSet(key, async () => {
      const { data } = await owClient.get("/air_pollution", { params: addKey({ lat, lon }) });
      return data;
    });
  },
};

module.exports = weatherService;
