/* eslint-disable no-console */

const { MongoClient } = require('mongodb');

const init = (connectionString) => {
    return MongoClient.connect(connectionString)
        .then((db) => {
            console.log('Connected...');
            return db;
        });
};

module.exports = { init };
