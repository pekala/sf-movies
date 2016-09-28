const fs = require('fs');
const path = require('path');
const axios = require('axios');
const shuffle = require('lodash.shuffle');
const rawData = require('./raw-data');

const getTMDBConfig = axios.get('https://api.themoviedb.org/3/configuration', {
    params: {
        api_key: process.env.TMDB_API_KEY,
    }
}).then(response => response.data.images);

const addProfileUrl = item => getTMDBConfig.then(config =>
    Object.assign(item, {
        main_actor: Object.assign(item.main_actor, {
            profile_url: `${config.secure_base_url}${config.profile_sizes[5]}${item.profile_path}`,
            profile_path: undefined,
        })
    })
)

module.exports = function actorData(items) {
    return Promise.all(items.map(item =>
        axios.get('https://api.themoviedb.org/3/search/person', {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US',
                query: item.actor_1,
            }
        })
        .then(response => response.data.results[0])
        .then(actorData => Object.assign({}, item, {
            main_actor: {
                name: actorData.name,
                popularity: actorData.popularity,
                profile_path: actorData.profile_path,
                known_for: actorData.known_for.map(movie => movie.title),
            }
        }))
        .then(addProfileUrl)
    ));
};
