/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
    app.get('/', (req, res) => {
        return res.render('welcome', { title: 'TravelStories' });
    });

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });

    app.all('*', (req, res) => {
        res.status(404);
        res.render('error');
        res.end();
    });
};

module.exports = { attachTo };
