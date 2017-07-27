const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.places.getAll()
                .then((places) => {
                    return res.render('places', {
                        context: places,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
