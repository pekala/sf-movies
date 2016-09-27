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

const addPosterUrl = item => getTMDBConfig.then(config =>
    Object.assign(item, {
        poster_url: `${config.secure_base_url}${config.poster_sizes[5]}${item.poster_path}`,
        poster_path: undefined,
    })
)

module.exports = function movieData(items) {
    return Promise.all(items.map(item =>
        axios.get('https://api.themoviedb.org/3/search/movie', {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US',
                query: item.title,
                year: item.release_year,
            }
        })
        .then(response => response.data.results[0].id)
        .then(movieId => axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
            params: {
                api_key: process.env.TMDB_API_KEY,
                language: 'en-US',
                append_to_response: 'images',
            }
        }))
        .then(response => response.data)
        .then(movieData => Object.assign({}, item, {
            genres: movieData.genres.map(genre => genre.name),
            overview: movieData.overview,
            tagline: movieData.tagline,
            score: movieData.vote_average,
            popularity: movieData.popularity,
            poster_path: movieData.poster_path,
        }))
        .then(addPosterUrl)
    ));
};
