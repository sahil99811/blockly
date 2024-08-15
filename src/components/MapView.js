
import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import RoutingControl from './RoutingControl';
import {Icon} from '../utils/Icon';
const MapView = ({ currentLoc, destination, heading}) => {
  return (
    <MapContainer center={currentLoc} zoom={10} style={{ height: '100vh', width: '100%' ,zIndex:"100"}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {!destination && (
        <Marker position={currentLoc} icon={Icon(0, 'location')} />
      )}
      {destination && (
        <>
          <Marker position={destination} icon={Icon(0, 'destination')} />
          <Marker position={currentLoc} icon={Icon(heading, 'car')} />
          <RoutingControl start={currentLoc} destination={destination}  />
        </>
      )}
    </MapContainer>
  );
};

export default MapView;
