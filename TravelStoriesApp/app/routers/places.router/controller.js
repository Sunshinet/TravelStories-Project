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
            getByTitle(req, res) {
                const name = req.params.name;
                return data.places.getByTitle(name)
                .then((result) => {
                    console.log(result);
                });
            },
    };

    return controller;
};


module.exports = { init };
