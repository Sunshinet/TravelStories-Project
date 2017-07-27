const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/places', (req, res) => {
        return controller.getAll(req, res);
    });

    // app.get('/places/'+ req, (req, res) => {
    //     return controller.getByTitle(req, res);
    // });
};

module.exports = { attachTo };
