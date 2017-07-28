/* globals __dirname */

const fs = require('fs');
const path = require('path');

const attachTo = (app, data) => {
    app.get('/', (req, res) => {
        return res.render('main', { title: 'TravellStories' });
    });

    // app.get('/flash', function(req, res) {
    //     req.flash('info', 'Flash is back!');
    //     res.redirect('/team');
    // });

    // app.get('/team', function(req, res) {
    //     res.render('team', { messages: req.flash('info') });
    // });

    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.router'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            require(modulePath).attachTo(app, data);
        });
};

module.exports = { attachTo };
