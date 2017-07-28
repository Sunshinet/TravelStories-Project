const init = (data) => {
    const controller = {
        getAll(req, res) {
            return res.render('team', { title: 'Our Team' });
        },
    };

    return controller;
};


module.exports = { init };
