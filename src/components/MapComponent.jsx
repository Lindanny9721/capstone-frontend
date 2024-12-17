import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const mapContainerStyle = {
  width: '100vw',
  height: '100vh',
};

const MapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [places, setPlaces] = useState([]);
  const [radius, setRadius] = useState(1000);
  const [error, setError] = useState(null)
  const [placeTypes, setPlaceTypes] = useState({
    restaurant: false,
    cafe: false,
    park: false
  });
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
    await fetchPlaces(lat,lng,radius);
  };
  const handlePlaceTypeChange = (e) => {
    setPlaceTypes({...placeTypes, [e.target.name]: e.target.checked});
  };
  const fetchPlaces = async (lat,lng,radius) => {
    setError('');
    try {
      const response = await axios.post('http://localhost:4000/apiPlaces/places', { lat, lng, radius, placeTypes });
      setPlaces(response.data);
      console.log(response.data);
    } catch(error) {
      setError('Error fetching places: ', + error.message);
      if(error.response) console.log(error.response.data.error);
    }
  }

  return (
    <>
    {error && <div style={{ color: 'red' }}>{error}</div>}
    <div className='place-types'>
      <h3>Select Place Types</h3>
        {Object.keys(placeTypes).map((type) => (
          <label key={type}>
            <input
              type="checkbox"
              name={type}
              checked={placeTypes[type]}
              onChange={handlePlaceTypeChange}
            />
            {type}
          </label>
        ))}
    </div>
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={currentLocation}
        zoom={15}
        onClick={handleMapClick}
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            position={{
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
            }}
            />
          ))}
            <Marker
              position={selectedLocation}
            />
      </GoogleMap>
    </LoadScript>
    </>
  );
};

export default MapComponent;
