const init = (data) => {
    const controller = {
        getAll(req, res) {
            return res.render('team', {
            });
        },
    };

    return controller;
};


module.exports = { init };
