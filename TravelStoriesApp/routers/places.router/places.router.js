const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/places', (req, res) => {
        return controller.getAll(req, res);
    });
};

module.exports = { attachTo };
