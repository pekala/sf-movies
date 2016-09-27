const fs = require('fs');
const path = require('path');
const axios = require('axios');
const shuffle = require('lodash.shuffle');
const rawData = require('./raw-data');

module.exports = function geocode(items) {
    return Promise.all(items.map(item =>
        axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: item.locations,
                components: 'locality:San+Francisco|administrative_area:CA|country:US',
                key: process.env.GEOCODE_API_KEY
            }
        })
        .then(response => response.data.results[0])
        .then(geocodeData => Object.assign({}, item, {
            full_address: geocodeData.formatted_address,
            geometry: geocodeData.geometry,
            location_types: geocodeData.types,
        }))
    ));
};
