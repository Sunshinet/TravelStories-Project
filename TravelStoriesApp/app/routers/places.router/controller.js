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

        getOne(req, res) {
            return data.places.findById(req.params.id)
                .then((place) => {
                    console.log(place);
                    return res.render('places/single-place', {
                        title: 'One Place',
                        context: place[0],
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
