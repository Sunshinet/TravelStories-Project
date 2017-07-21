/* eslint-disable no-console */

const async = () => {
    return Promise.resolve();
};

const config = require('./server.config/');

async()
    .then(() => require('./db/').init(config.connectionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(config.port, () =>
            console.log(`server running at :${config.port}`));
    })
    .catch((err) => {
        console.log(err);
    });
