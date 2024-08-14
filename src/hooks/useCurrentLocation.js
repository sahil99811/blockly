
import { useState, useEffect } from 'react';

const useCurrentLocation = () => {
  const [currentLoc, setCurrentLoc] = useState([23.397221, 80.061234]);
  const [heading, setHeading] = useState(0);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log(position);
        const { latitude, longitude, heading } = position.coords;
        setCurrentLoc([latitude, longitude]);
        setHeading(heading || 0);
      },
      (error) => {
        console.error('Error getting current location:', error);
        setCurrentLoc([23.397221, 80.061234]);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return [currentLoc, heading];
};

export default useCurrentLocation;
