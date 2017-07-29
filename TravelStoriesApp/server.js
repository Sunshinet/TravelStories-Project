/* eslint-disable no-console */


const ServerConfig = require('./server.config/');
const socket = require('socket.io');
Promise.resolve()
    .then(() => require('./db').init(ServerConfig.connectionString))
    .then((db) => require('./data').init(db))
    .then((data) => require('./app').init(data))
    .then((app) => {
       const server = app.listen(ServerConfig.port, () =>
            console.log(`Server is running at :${ServerConfig.port}`));
          const io = socket(server);
          io.on('connection', (websocket) => {
              console.log('stana');
          });
    })
    .catch((err) => {
        console.log(err);
    });
