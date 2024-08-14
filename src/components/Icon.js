import L from 'leaflet';

const Icon = (heading, iconType) => {
    let iconSrc;
    if (iconType === 'location') {
        iconSrc = require('../assets/location.png'); // Update the path if necessary
    } else if (iconType === 'destination') {
        iconSrc = require('../assets/destination.png'); // Update the path if necessary
    } else {
        iconSrc = require('../assets/car.png'); // Default icon
    }

    return L.divIcon({
        html: `<img src="${iconSrc}" style="transform: rotate(${heading}deg); width: 50px; height: 50px;" />`,
        iconSize: [50, 50],
        className: 'custom-div-icon',
    });
};

export default Icon;
