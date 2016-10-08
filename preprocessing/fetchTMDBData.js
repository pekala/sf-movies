const axios = require('axios');

const queue = [];

setInterval(() => {
    const batch = queue.splice(0, 30);
    if (batch.length) {
        console.log(`Making ${batch.length} requests to tmdb (${queue.length} left)`);
        batch.map(request => request())
    }
}, 11000);

function makeRequest(route, params, resolve, reject) {
    console.log(`Making a request to ${route} (${JSON.stringify(params)})`);
    const promise = axios
        .get(`https://api.themoviedb.org/3/${route}`, {
            params: Object.assign({}, params, {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US',
            }),
        })
        .then(response => response.data)
        .then(data => {
            resolve(data);
            return data;
        })
        .catch(error => {
            console.log('error while fetching', error);
            reject(error);
        });
};

module.exports = function getTMBData(route, params) {
    return new Promise((resolve, reject) => {
        queue.push(makeRequest.bind(null, route, params, resolve, reject));
    });
};
