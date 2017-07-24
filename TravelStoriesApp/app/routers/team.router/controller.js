const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.stories.getAll()
                .then((stories) => {
                    return res.render('places', {
                        context: stories,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
