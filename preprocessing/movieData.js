const axios = require('axios');
const fetchTMDBData = require('./fetchTMDBData');

const getTMDBConfig = axios.get('https://api.themoviedb.org/3/configuration', {
    params: {
        api_key: process.env.TMDB_API_KEY,
    }
}).then(response => response.data.images);

const addPosterUrl = item => getTMDBConfig.then(config =>
    Object.assign(item, {
        poster_url: `${config.secure_base_url}${config.poster_sizes[5]}${item.poster_path}`,
        poster_path: undefined,
    })
)

module.exports = function movieData(items) {
    return Promise.all(items.map(item =>
        fetchTMDBData('search/movie', {
            query: item.title,
            year: item.release_year,
        })
        .then(data => data.results[0].id)
        .then(movieId => fetchTMDBData(`movie/${movieId}`, {
            append_to_response: 'images',
        }))
        .then(movieData => Object.assign({}, item, {
            genres: movieData.genres.map(genre => genre.name),
            overview: movieData.overview,
            tagline: movieData.tagline,
            score: movieData.vote_average,
            popularity: movieData.popularity,
            poster_path: movieData.poster_path,
        }))
        .then(addPosterUrl)
        .catch(error => {
            console.log(error);
            console.log(`ERROR for ${item.title}, romoving from data`);
            return null;
        })
    ))
    .then(items => {
        console.log('Movie data collected');
        return items;
    });
};
