
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const RoutingControl = ({ start, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !start || !destination) return;

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
  }, [map, start, destination]);

  return null;
};

export default RoutingControl;
