import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine'; 

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
      createMarker: () => null, 
      addWaypoints: false,
      draggableWaypoints: false, 
    }).on('routesfound', function(e) {
        const route = e.routes[0];
        updateInstructions(route);
    }).on('routeselected', function(e) {
        const route = e.route;
        updateInstructions(route);
    }).addTo(map);

    const updateInstructions = (route) => {
        const summary = route.summary;
        const instructions = route.instructions;
       console.log(summary,instructions);
    };
    
 
 const controlContainer = document.querySelector('.leaflet-routing-container');
 if (controlContainer) {
   controlContainer.style.display = 'none';
 }


    return () => map.removeControl(routingControl);
  }, [map, start, destination]);

  return null;
};

export default RoutingControl;

