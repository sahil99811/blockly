import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import car from './car.png'
import 'leaflet-routing-machine';
const destination = [23.1686, 79.9339];

const carIcon = new L.Icon({
  iconUrl: car, // Replace with your car icon URL
  iconSize: [50, 50], // Adjust size as needed
  iconAnchor: [25, 25], // Anchor the icon in the center
});

const RoutingControl = ({ start }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !start) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(destination[0], destination[1]),
      ],
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: 'green', weight: 3 }],
      },
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map, start]);

  return null;
};

function App() {
  const [start, setStart] = useState(null);
  const [heading, setHeading] = useState(0); // State to store heading

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude, heading } = position.coords;
        setStart([latitude, longitude]);
        setHeading(heading || 0); // Fallback to 0 if heading is null
      },
      (error) => {
        console.error('Error getting current location:', error);
        setStart([23.397221, 80.061234]);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId); // Clear the watcher when the component unmounts
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, heading } = position.coords;
          setStart([latitude, longitude]);
          setHeading(heading || 0);
        },
        (error) => {
          console.error('Error updating location:', error);
        },
        { enableHighAccuracy: true }
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="App">
      <MapContainer center={start || [23.397221, 80.061234]} zoom={12} style={{ height: '90vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {start && (
          <Marker
            position={start}
            icon={carIcon}
            // Rotate the icon using the heading
            style={{ transform: `rotate(${heading}deg)` }}
          />
        )}
        <Marker position={destination} icon={carIcon} />
        {start && <RoutingControl start={start} />}
      </MapContainer>
    </div>
  );
}

export default App;
