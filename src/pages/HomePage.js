import React ,{ useState, useEffect }from 'react'
import LocationSearch from '../components/LocationSearch'
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import RoutingControl from '../components/RoutingControl';
import 'leaflet-routing-machine';
import Icon from '../components/Icon'
export default function HomePage() {
    const [currentLoc, setCurrentLoc] = useState([23.397221, 80.061234]);
    const [destination, setDestination] = useState(null);
    const [heading, setHeading] = useState(0);
    const handleDestinationSelect = (lat, lon) => {
        setDestination([parseFloat(lat), parseFloat(lon)]);
      };
     
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

  return (
    <div style={{width:"100vw",height:"100vh"}} >
      <LocationSearch onSelect={handleDestinationSelect}/>
      <MapContainer center={currentLoc} zoom={10} style={{ height: '100vh', width: '100%' ,zIndex:"100"}}>
         <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {
            !destination&&(
                <Marker
                position={currentLoc}
                icon={Icon(0, 'location')}
            />
            )
        }
        {
            destination&&(
                <Marker
                position={destination}
                icon={Icon(0,'destination')}
                />
            )
        }
        {
            destination&&(
                <Marker
                position={currentLoc}
                icon={Icon(heading,'car')}
                />
            )
        }
        {
            destination&&(
                <RoutingControl start={currentLoc} destination={destination}/>
            )
        }
      </MapContainer>
    </div>
  )
}
