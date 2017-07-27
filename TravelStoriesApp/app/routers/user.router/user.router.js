const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/users', (req, res) => {
        return controller.getAll(req, res);
    });

    app.get('/users/:id', (req, res) => {
        return controller.getOne(req, res);
    });
};

module.exports = { attachTo };
