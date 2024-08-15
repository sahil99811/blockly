import { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
let temp=0;
const RoutingControl = ({ start, destination,setInstruction }) => {
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
      }).on('routesfound', function(e) {
        const route = e.routes[0];
        if(temp!==route.instructions[0].distance){
          temp=route.instructions[0].distance;
          setInstruction(route.instructions[0])
        }    
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
