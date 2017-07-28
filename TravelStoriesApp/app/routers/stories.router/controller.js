const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.stories.getAll()
                .then((stories) => {
                    return res.render('stories/stories-all', {
                        context: stories,
                    });
                });
        },

        getOne(req, res) {
            return data.stories.findById(req.params.id)
                .then((story) => {
                    return res.render('stories/single-story', {
                        context: story[0],
                    });
                });
        },

        getForm(req, res) {
            return Promise.resolve()
                .then(() => {
                    return res.render('stories/form');
                });
        },

        create(req, res) {
            const story = req.body;
            story.visible = true;

            // validate item
            const place = {
                name: story.place,
            };

            const user = req.user;

            story.user = {
                id: user._id,
                username: user.username,
            };

            return Promise
                .all([
                    data.stories.create(story),
                    data.places.findOrCreateBy(place),
                ])
                .then(([dbStory, dbPlaces]) => {
                    dbPlaces.name = story.place;
                    dbPlaces.story = dbPlaces.story || [];
                    dbPlaces.story.push({
                        _id: dbStory._id,
                        titleStory: dbStory.titleStory,
                        body: dbStory.body,
                    });

                    dbStory.place = {
                        _id: dbPlaces._id,
                        name: dbPlaces.name,
                    };

                    user.stories = user.stories || [];
                    user.stories.push({
                        _id: dbStory._id,
                        titleStory: dbStory.titleStory,
                        body: dbStory.body,
                        place: dbStory.place,
                    });

                    return Promise.all([
                        data.stories.updateById(dbStory),
                        data.places.updateById(dbPlaces),
                        data.users.updateById(user),
                    ]);
                })
                .then(() => {
                    return res.redirect('/stories');
                })
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/stories/form');
                });
        },

        delete(req, res) {
            return data.stories.findById(req.params.id)
                .then((story) => {
                    console.log(story);
                    story.visible = false;
                    return res.redirect('/stories');
                });
        },
    };


    return controller;
};


module.exports = { init };
