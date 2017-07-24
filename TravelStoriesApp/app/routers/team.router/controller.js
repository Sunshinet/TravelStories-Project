const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.stories.getAll()
                .then(() => {
                    return res.render('team', {
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
