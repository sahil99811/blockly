import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

const RoutingControl = ({ start, destination }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map || !start || !destination) return;

    if (routingControlRef.current) {
      routingControlRef.current.setWaypoints([
        L.latLng(start[0], start[1]),
        L.latLng(destination[0], destination[1]),
      ]);
    } else {
      routingControlRef.current = L.Routing.control({
        waypoints: [
          L.latLng(start[0], start[1]),
          L.latLng(destination[0], destination[1]),
        ],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: 'green', weight: 3 }],
        },
        createMarker: () => null, 
        addWaypoints: false,
        draggableWaypoints: false,
      }).addTo(map);
    }

    const controlContainer = document.querySelector('.leaflet-routing-container');
    if (controlContainer) {
      controlContainer.style.display = 'none';
    }

  }, [map, start, destination]);

  return null;
};

export default RoutingControl;
