const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/categories', (req, res) => {
        return controller.getAll(req, res);
    });

    app.get('/categories/:id', (req, res) => {
        return controller.getOne(req, res);
    });
};

module.exports = { attachTo };
