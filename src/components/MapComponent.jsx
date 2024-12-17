import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const MapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting user's location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported");
    }
  }, []);
  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedLocation({ lat, lng });
    console.log(selectedLocation);

  };

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentLocation}
        zoom={15}
        onClick={handleMapClick}
      >
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
