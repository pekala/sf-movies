const axios = require('axios');

const queue = [];

setInterval(() => {
    const batch = queue.splice(0, 45);
    if (batch.length) {
        console.log(`Making ${batch.length} requests to google`);
        batch.map(request => request())
    }
}, 1500);

function makeRequest(location, resolve, reject) {
    console.log(`Making a request to google geocoding (${location})`);
    return axios
        .get('https://maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: location,
                components: 'locality:San+Francisco|administrative_area:CA|country:US',
                key: process.env.GEOCODE_API_KEY
            },
        })
        .then(response => response.data)
        .then(data => resolve(data))
        .catch(error => {
            console.log('error while fetching', error);
            reject(error)
        });
};

module.exports = function getTMBData(location) {
    return new Promise((resolve, reject) => {
        queue.push(makeRequest.bind(null, location, resolve, reject));
    });
};
