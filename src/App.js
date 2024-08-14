import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';

const destination = [23.1686, 79.9339];

const markerIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
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

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log(position)
        const { latitude, longitude } = position.coords;
        setStart([latitude, longitude]);
      },
      (error) => {
        console.error('Error getting current location:', error);
        // Fallback to a default start position if geolocation fails
        setStart([23.397221, 80.061234]);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId); // Clear the watcher when the component unmounts
    };
  }, []);

  return (
    <div className="App">
      <MapContainer center={start || [23.397221, 80.061234]} zoom={12} style={{ height: '90vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {start && <Marker position={start} icon={markerIcon} />}
        <Marker position={destination} icon={markerIcon} />
        {start && <RoutingControl start={start} />}
      </MapContainer>
    </div>
  );
}

export default App;
