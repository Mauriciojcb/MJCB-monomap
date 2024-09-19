import axios from 'axios';

export const getMapboxImage = (lat: number, lng: number) => {
  const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN; // Verifica que esté en el archivo .env
  const mapboxUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s(${lng},${lat})/${lng},${lat},14/600x600?access_token=${mapboxToken}`;
  return mapboxUrl;
};
