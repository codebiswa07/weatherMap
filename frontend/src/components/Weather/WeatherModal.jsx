import React from "react";
import { useWeatherByCoords, useForecast } from "../../hooks/useWeather";
import { formatTemp, getWindDirection, getAQILabel } from "../../utils/weatherUtils";
import ForecastChart from "./ForecastChart";

export default function WeatherModal({ location, onClose }) {
  const { lat, lon } = location;
  const { data: weather, isLoading, isError } = useWeatherByCoords(lat, lon);
  const { data: forecast } = useForecast(lat, lon);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        {isLoading && <div className="modal-loading"><div className="spinner" />Loading weather…</div>}
        {isError   && <div className="modal-error">⚠ Failed to load weather data.</div>}

        {weather && (
          <>
            <div className="modal-header">
              <div>
                <h2 className="city-name">{weather.name}{weather.sys?.country ? `, ${weather.sys.country}` : ""}</h2>
                <p className="coords-label">{lat.toFixed(4)}, {lon.toFixed(4)}</p>
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="weather-icon-lg"
              />
            </div>

            <div className="temp-display">
              <span className="temp-main">{formatTemp(weather.main.temp)}</span>
              <span className="temp-feels">Feels like {formatTemp(weather.main.feels_like)}</span>
            </div>
            <p className="weather-desc">{weather.weather[0].description}</p>

            <div className="stats-grid">
              <StatCard icon="💧" label="Humidity"   value={`${weather.main.humidity}%`} />
              <StatCard icon="💨" label="Wind"       value={`${Math.round(weather.wind.speed)} m/s ${getWindDirection(weather.wind.deg)}`} />
              <StatCard icon="👁"  label="Visibility" value={`${(weather.visibility / 1000).toFixed(1)} km`} />
              <StatCard icon="🌡" label="Pressure"   value={`${weather.main.pressure} hPa`} />
              <StatCard icon="🌅" label="Min / Max"  value={`${formatTemp(weather.main.temp_min)} / ${formatTemp(weather.main.temp_max)}`} />
              <StatCard icon="☁️" label="Cloud Cover" value={`${weather.clouds?.all ?? 0}%`} />
            </div>

            {forecast && <ForecastChart forecast={forecast} />}
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <span className="stat-label">{label}</span>
      <span className="stat-value">{value}</span>
    </div>
  );
}
