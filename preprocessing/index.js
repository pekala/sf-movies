const fs = require('fs');
const path = require('path');
const shuffle = require('lodash.shuffle');

const rawData = require('./raw-data');
const getGeocoding = require('./geocoding');

const saveToFile = items => new Promise((resolve, reject) =>
    fs.writeFile(
        path.resolve(__dirname, 'processed-data.json'),
        JSON.stringify(items, null, 4),
        err => err ? reject(error) : resolve()
    )
);

const items = shuffle(rawData)
.filter(item => item.locations)
.slice(0, 10);

Promise.resolve(items)
.then(getGeocoding)
.then(saveToFile)
.then(() => console.log(`Easy peasy! 🦄`))
.catch(error => console.log(`Something went wrong 🙊: ${error} ${error.stack}`));
