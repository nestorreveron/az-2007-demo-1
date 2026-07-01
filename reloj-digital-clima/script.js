// Reloj digital con temperatura y clima ambiental
// Usa la API pública de Open-Meteo (sin API key) y geolocalización del navegador.

const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const statusEl = document.getElementById("weather-status");
const infoEl = document.getElementById("weather-info");
const iconEl = document.getElementById("weather-icon");
const temperatureEl = document.getElementById("temperature");
const feelsLikeEl = document.getElementById("feels-like");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const locationEl = document.getElementById("location");
const unitSelect = document.getElementById("unit-select");
const formatSelect = document.getElementById("format-select");
const refreshBtn = document.getElementById("refresh-btn");

const WEATHER_CODES = {
  0: { label: "Despejado", icon: "☀️" },
  1: { label: "Mayormente despejado", icon: "🌤️" },
  2: { label: "Parcialmente nublado", icon: "⛅" },
  3: { label: "Nublado", icon: "☁️" },
  45: { label: "Niebla", icon: "🌫️" },
  48: { label: "Niebla helada", icon: "🌫️" },
  51: { label: "Llovizna ligera", icon: "🌦️" },
  53: { label: "Llovizna", icon: "🌦️" },
  55: { label: "Llovizna intensa", icon: "🌧️" },
  61: { label: "Lluvia ligera", icon: "🌧️" },
  63: { label: "Lluvia", icon: "🌧️" },
  65: { label: "Lluvia intensa", icon: "🌧️" },
  71: { label: "Nieve ligera", icon: "🌨️" },
  73: { label: "Nieve", icon: "🌨️" },
  75: { label: "Nieve intensa", icon: "❄️" },
  80: { label: "Chubascos ligeros", icon: "🌦️" },
  81: { label: "Chubascos", icon: "🌧️" },
  82: { label: "Chubascos fuertes", icon: "⛈️" },
  95: { label: "Tormenta", icon: "⛈️" },
  96: { label: "Tormenta con granizo", icon: "⛈️" },
  99: { label: "Tormenta severa con granizo", icon: "⛈️" },
};

let lastCoords = null;

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateClock() {
  const now = new Date();
  const use12h = formatSelect.value === "12";

  let hours = now.getHours();
  let suffix = "";

  if (use12h) {
    suffix = hours >= 12 ? " PM" : " AM";
    hours = hours % 12 || 12;
  }

  timeEl.textContent = `${pad(hours)}:${pad(now.getMinutes())}:${pad(now.getSeconds())}${suffix}`;

  dateEl.textContent = now.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

async function fetchLocationName(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`
    );
    if (!response.ok) throw new Error("No se pudo obtener la ubicación");
    const data = await response.json();
    return [data.city || data.locality, data.principalSubdivision, data.countryName]
      .filter(Boolean)
      .join(", ");
  } catch (error) {
    return "Ubicación desconocida";
  }
}

async function fetchWeather(latitude, longitude, unit) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: "temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code",
    temperature_unit: unit,
    wind_speed_unit: "kmh",
    timezone: "auto",
  });

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`);
  if (!response.ok) throw new Error("No se pudo obtener el clima");
  return response.json();
}

function renderWeather(data, locationName) {
  const current = data.current;
  const weatherInfo = WEATHER_CODES[current.weather_code] || { label: "Desconocido", icon: "🌡️" };
  const unitSymbol = unitSelect.value === "fahrenheit" ? "°F" : "°C";

  iconEl.textContent = weatherInfo.icon;
  temperatureEl.textContent = `${Math.round(current.temperature_2m)}${unitSymbol}`;
  feelsLikeEl.textContent = `${Math.round(current.apparent_temperature)}${unitSymbol}`;
  humidityEl.textContent = `${Math.round(current.relative_humidity_2m)}%`;
  windEl.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
  locationEl.textContent = `${weatherInfo.label} · ${locationName}`;

  statusEl.classList.add("hidden");
  infoEl.classList.remove("hidden");
}

async function loadWeather(latitude, longitude) {
  statusEl.classList.remove("hidden");
  infoEl.classList.add("hidden");
  statusEl.textContent = "Cargando clima…";

  try {
    const [weatherData, locationName] = await Promise.all([
      fetchWeather(latitude, longitude, unitSelect.value),
      fetchLocationName(latitude, longitude),
    ]);
    renderWeather(weatherData, locationName);
  } catch (error) {
    statusEl.classList.remove("hidden");
    infoEl.classList.add("hidden");
    statusEl.textContent = "No se pudo cargar el clima. Intenta de nuevo.";
  }
}

function requestLocationAndLoadWeather() {
  if (!navigator.geolocation) {
    statusEl.textContent = "Tu navegador no soporta geolocalización.";
    return;
  }

  statusEl.textContent = "Obteniendo ubicación…";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      lastCoords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      loadWeather(lastCoords.latitude, lastCoords.longitude);
    },
    () => {
      statusEl.textContent = "Permiso de ubicación denegado. Usando ubicación por defecto.";
      lastCoords = { latitude: 40.4168, longitude: -3.7038 }; // Madrid, por defecto
      loadWeather(lastCoords.latitude, lastCoords.longitude);
    },
    { timeout: 10000 }
  );
}

unitSelect.addEventListener("change", () => {
  if (lastCoords) {
    loadWeather(lastCoords.latitude, lastCoords.longitude);
  }
});

formatSelect.addEventListener("change", updateClock);

refreshBtn.addEventListener("click", () => {
  if (lastCoords) {
    loadWeather(lastCoords.latitude, lastCoords.longitude);
  } else {
    requestLocationAndLoadWeather();
  }
});

updateClock();
setInterval(updateClock, 1000);
requestLocationAndLoadWeather();
