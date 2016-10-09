#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const shuffle = require('lodash.shuffle');

const rawData = require('./processed-data-saved');
const getGeocoding = require('./geocoding');
const getMovieData = require('./movieData');
const getActorData = require('./actorData');

const saveToFile = items => new Promise((resolve, reject) =>
    fs.writeFile(
        path.resolve(__dirname, 'processed-data.json'),
        JSON.stringify(items, null, 4),
        err => err ? reject(error) : resolve()
    )
);

const items = shuffle(rawData)
.filter(item => item.locations);

Promise.resolve(items)
.then(getGeocoding)
.then(movieData => movieData.filter(item => !!item))
.then(getMovieData)
.then(movieData => movieData.filter(item => !!item))
.then(getActorData)
.then(movieData => movieData.filter(item => !!item))
.then(saveToFile)
.then(() => {
    console.log(`Easy peasy! 🦄`);
    process.exit(0);
})
.catch(error => console.log(`Something went wrong 🙊: ${error} ${error.stack}`));
