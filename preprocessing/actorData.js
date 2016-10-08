const axios = require('axios');
const fetchTMDBData = require('./fetchTMDBData');

const getTMDBConfig = axios.get('https://api.themoviedb.org/3/configuration', {
    params: {
        api_key: process.env.TMDB_API_KEY,
    }
}).then(response => response.data.images);

const addProfileUrl = item => getTMDBConfig.then(config =>
    Object.assign(item, {
        main_actor: Object.assign(item.main_actor, {
            profile_url: `${config.secure_base_url}${config.profile_sizes[1]}${item.main_actor.profile_path}`,
            profile_path: undefined,
        })
    })
)

module.exports = function actorData(items) {
    return Promise.all(items.map(item => {
        if (!item.actor_1) {
            return Promise.resolve(item);
        }
        return fetchTMDBData('search/person', {
            query: item.actor_1,
        })
        .then(data => data.results[0])
        .then(actorData => Object.assign({}, item, {
            main_actor: {
                name: actorData.name,
                popularity: actorData.popularity,
                profile_path: actorData.profile_path,
                known_for: actorData.known_for.map(movie => movie.title),
            }
        }))
        .then(addProfileUrl)
        .catch(() => item)
    }))
    .then(items => {
        console.log('Actor data collected');
        return items;
    });
};
