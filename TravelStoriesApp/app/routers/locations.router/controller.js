const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.locations.getAll()
                .then((locations) => {
                    return res.render('locations/all-locations', {
                        title: 'All Locations',
                        context: locations,
                    });
                });
        },
        getAllapi(req, res) {
            return data.locations.getAll()
                .then((locations) => {
                    return res.send(locations);
                });
        },

        getOne(req, res) {
            let currentLocation;
            return data.locations.findById(req.params.id)
                .then((location) => {
                    currentLocation = location[0];
                    return data.stories.findByIdsVisible(currentLocation.stories);
                })
                .then((stories) => {
                    currentLocation.stories = stories;
                    
                    return res.render('locations/single-location', {
                        title: 'One Location',
                        context: currentLocation,
                    });
                });
        },

        getByTitle(req, res) {
            const name = req.params.name;
            return data.locations.getByLocation(name)
                .then((result) => {
                });
        },
    };

    return controller;
};


module.exports = { init };
