const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/users/:id', (req, res) => {
        return controller.getUser(req, res);
    });
};

module.exports = { attachTo };
