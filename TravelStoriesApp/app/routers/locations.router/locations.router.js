const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/locations', (req, res) => {
        return controller.getAll(req, res);
    });

    app.get('/locations/:id', (req, res) => {
        return controller.getOne(req, res);
    });
    app.get('/api/locations', (req, res) => {
        return controller.getAllapi(req, res);
    });
};

module.exports = { attachTo };
