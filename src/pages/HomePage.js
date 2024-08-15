
import React, { useState,useEffect } from 'react';
import LocationSearch from '../components/LocationSearch';
import MapView from '../components/MapView';
import useCurrentLocation from '../hooks/useCurrentLocation';
import InstructionCard from '../components/InstructionCard';

const HomePage = () => {
  const [currentLoc, heading] = useCurrentLocation();
  const [destination, setDestination] = useState(null);
  const [instruction,setInstruction]=useState(null);
  const [showInstruction, setShowInstruction] = useState(false);
  const handleDestinationSelect = (lat, lon) => {
    setDestination([parseFloat(lat), parseFloat(lon)]);
  };
  useEffect(() => {
    if (instruction) {
      setShowInstruction(true);
      const timer = setTimeout(() => {
        setShowInstruction(false);
      }, 30000);

      return () => clearTimeout(timer); 
    }
  }, [instruction]);
  console.log(instruction);
  return (
    <div style={{ width: '100vw', height: '100vh' ,position:"relative"}}>
      <LocationSearch onSelect={handleDestinationSelect} />
      <MapView currentLoc={currentLoc} destination={destination} heading={heading} setInstruction={setInstruction}/>
      {
        (instruction&&showInstruction)&&<InstructionCard instruction={instruction}/>
      }
    </div>
  );
};

export default HomePage;
