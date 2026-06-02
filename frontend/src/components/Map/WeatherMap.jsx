import React, { useState, useCallback, useRef } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const pulseIcon = L.divIcon({
  className: "",
  html: `<div class="map-pulse-marker"><div class="pulse-ring"></div><div class="pulse-dot"></div></div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

function ClickHandler({ onMapClick }) {
  useMapEvents({ click: (e) => onMapClick(e.latlng) });
  return null;
}

export default function WeatherMap({ onLocationSelect }) {
  const [markers, setMarkers] = useState([]);
  const [activeLayer, setActiveLayer] = useState("standard");
  const mapRef = useRef(null);

  const handleMapClick = useCallback(({ lat, lng }) => {
    const newMarker = { lat, lng, id: Date.now() };
    setMarkers([newMarker]);
    onLocationSelect({ lat, lon: lng });
  }, [onLocationSelect]);

  const tileLayers = {
    standard: {
      url:         "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution: "© OpenStreetMap © CARTO",
      label:       "Dark",
    },
    satellite: {
      url:         "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "© Esri",
      label:       "Satellite",
    },
    terrain: {
      url:         "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution: "© OpenTopoMap",
      label:       "Terrain",
    },
  };

  const owKey = process.env.REACT_APP_OPENWEATHER_API_KEY || "";
  const weatherLayers = [
    { id: "precipitation_new", label: "🌧 Rain" },
    { id: "clouds_new",        label: "☁️ Clouds" },
    { id: "temp_new",          label: "🌡 Temp" },
    { id: "wind_new",          label: "💨 Wind" },
  ];
  const [activeWeatherLayer, setActiveWeatherLayer] = useState(null);

  return (
    <div className="map-wrapper">
      {/* Layer Controls */}
      <div className="map-controls">
        <div className="layer-group">
          {Object.entries(tileLayers).map(([key, val]) => (
            <button
              key={key}
              className={`layer-btn ${activeLayer === key ? "active" : ""}`}
              onClick={() => setActiveLayer(key)}
            >
              {val.label}
            </button>
          ))}
        </div>
        <div className="layer-group">
          {weatherLayers.map((wl) => (
            <button
              key={wl.id}
              className={`layer-btn weather-layer-btn ${activeWeatherLayer === wl.id ? "active" : ""}`}
              onClick={() => setActiveWeatherLayer(prev => prev === wl.id ? null : wl.id)}
            >
              {wl.label}
            </button>
          ))}
        </div>
      </div>

      <div className="map-hint">🖱 Click anywhere on the map to get weather</div>

      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={2}
        maxZoom={18}
        zoomControl={false}
        style={{ height: "100%", width: "100%", background: "#0d1117" }}
        ref={mapRef}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          key={activeLayer}
          url={tileLayers[activeLayer].url}
          attribution={tileLayers[activeLayer].attribution}
          maxZoom={18}
        />
        {activeWeatherLayer && owKey && (
          <TileLayer
            key={activeWeatherLayer}
            url={`https://tile.openweathermap.org/map/${activeWeatherLayer}/{z}/{x}/{y}.png?appid=${owKey}`}
            attribution="© OpenWeatherMap"
            opacity={0.6}
          />
        )}
        <ClickHandler onMapClick={handleMapClick} />
        {markers.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]} icon={pulseIcon}>
            <Popup className="custom-popup">
              <strong>{m.lat.toFixed(4)}, {m.lng.toFixed(4)}</strong><br />
              <small>Loading weather…</small>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
