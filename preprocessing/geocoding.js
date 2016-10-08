const axios = require('axios');
const fetchGoogleData = require('./fetchGoogleData');

module.exports = function geocode(items) {
    return Promise.all(items.map(item =>
        fetchGoogleData(item.locations)
        .then(data => data.results[0])
        .then(geocodeData => Object.assign({}, item, {
            full_address: geocodeData.formatted_address,
            geometry: geocodeData.geometry,
            location_types: geocodeData.types,
        }))
        .catch(() => item)
    ))
    .then(items => {
        console.log('Geocoding data collected');
        return items;
    });
};
