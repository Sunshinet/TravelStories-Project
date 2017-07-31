const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.places.getAll()
                .then((places) => {
                    return res.render('places/all-places', {
                        title: 'All Places',
                        context: places,
                    });
                });
        },
            getAllapi(req, res) {
            return data.places.getAll()
                .then((places) => {
                    return res.send(places);
                    // return res.render('places', {
                    //     title: 'All Places',
                    //     context: places,
                    // });
                });
        },

        getOne(req, res) {
            return data.places.findById(req.params.id)
                .then((place) => {
                    return res.render('places/single-place', {
                        title: 'One Place',
                        context: place[0],
                    });
                });
        },

        getByTitle(req, res) {
            const name = req.params.name;
            return data.places.getByPlace(name)
                .then((result) => {
                });
        },
    };

    return controller;
};


module.exports = { init };
