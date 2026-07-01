# Reloj Digital con Clima Ambiental

Aplicación web sencilla (HTML, CSS y JavaScript puro) que muestra:

- Reloj digital en tiempo real con formato 12h/24h configurable.
- Fecha actual.
- Temperatura y clima ambiental de tu ubicación (usando geolocalización del navegador).
- Sensación térmica, humedad y velocidad del viento.
- Selector de unidad de temperatura (°C / °F).
- Botón para actualizar el clima manualmente.

## Cómo usarlo

1. Abre `index.html` en tu navegador (doble clic o "Abrir con" tu navegador favorito).
2. Acepta el permiso de ubicación cuando el navegador lo solicite, para obtener el clima de tu zona.
   - Si rechazas el permiso, se mostrará el clima de una ubicación por defecto (Madrid).
3. Cambia la unidad de temperatura o el formato de hora desde los controles.

## Tecnologías y APIs

- [Open-Meteo](https://open-meteo.com/) para los datos de clima y temperatura (API gratuita, sin necesidad de API key).
- [BigDataCloud Reverse Geocoding](https://www.bigdatacloud.com/geocoding-apis/free-reverse-geocoding-api) para mostrar el nombre de la ciudad/región a partir de las coordenadas (API gratuita, sin API key).
- `navigator.geolocation` del navegador para obtener las coordenadas del usuario.

No requiere instalación ni dependencias: solo un navegador con conexión a internet.
