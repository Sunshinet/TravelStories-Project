/* eslint-disable no-console */


const ServerConfig = require('./server.config/');

Promise.resolve()
    .then(() => require('./db/').init(ServerConfig.connectionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
        app.listen(ServerConfig.port, () =>
            console.log(`Server is running at :${ServerConfig.port}`));
    })
    .catch((err) => {
        console.log(err);
    });
