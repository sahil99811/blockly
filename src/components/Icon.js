import L from 'leaflet';

const Icon = (heading, iconType) => {
    let iconSrc;
    if (iconType === 'location') {
        iconSrc = require('../assets/location.png'); 
    } else if (iconType === 'destination') {
        iconSrc = require('../assets/destination.png'); 
    } else {
        iconSrc = require('../assets/car.png'); 
    }

    return L.divIcon({
        html: `<img src="${iconSrc}" style="transform: rotate(${heading}deg); width: 50px; height: 50px;" />`,
        iconSize: [50, 50],
        className: 'custom-div-icon',
    });
};

export default Icon;
