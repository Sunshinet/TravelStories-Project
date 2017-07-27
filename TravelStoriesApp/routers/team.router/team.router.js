const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/team', (req, res) => {
        return controller.getAll(req, res);
    });
};

module.exports = { attachTo };
