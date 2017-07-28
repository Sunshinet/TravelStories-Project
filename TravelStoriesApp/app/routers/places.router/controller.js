const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.places.getAll()
                .then((places) => {
                    return res.render('places', {
                        title: 'All Places',
                        context: places,
                    });
                });
        },
        getByTitle(req, res) {
            const name = req.params.name;
            return data.places.getByPlace(name)
                .then((result) => {
                    console.log(result);
                });
        },
    };

    return controller;
};


module.exports = { init };
