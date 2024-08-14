
import React, { useState } from 'react';
import LocationSearch from '../components/LocationSearch';
import MapView from '../components/MapView';
import useCurrentLocation from '../hooks/useCurrentLocation';

const HomePage = () => {
  const [currentLoc, heading] = useCurrentLocation();
  const [destination, setDestination] = useState(null);

  const handleDestinationSelect = (lat, lon) => {
    setDestination([parseFloat(lat), parseFloat(lon)]);
  };

  return (
    <div style={{ width: '100vw', height: '100vh' ,position:"relative"}}>
      <LocationSearch onSelect={handleDestinationSelect} />
      <MapView currentLoc={currentLoc} destination={destination} heading={heading} />
    </div>
  );
};

export default HomePage;
