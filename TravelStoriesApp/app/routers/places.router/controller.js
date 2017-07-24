const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.stories.getAll()
                .then((places) => {
                    return res.render('places', {
                        // context: places,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
