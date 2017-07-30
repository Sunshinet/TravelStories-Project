const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.stories.getAll()
                .then((stories) => {
                    return res.render('stories/stories-all', {
                        title: 'All Stories',
                        context: stories,
                    });
                });
        },

        getOne(req, res) {
            return data.stories.findById(req.params.id)
                .then((story) => {
                    return res.render('stories/single-story', {
                        title: 'One Story',
                        context: story[0],
                    });
                });
        },

        getForm(req, res) {
            return Promise.resolve()
                .then(() => {
                    return res.render('stories/create-form');
                });
        },
        getEditForm(req, res) {
            return Promise.resolve()
                .then(() => {
                    return res.render('stories/edit-form');
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
                    dbPlaces.stories = dbPlaces.stories || [];
                    dbPlaces.stories.push({
                        _id: dbStory._id,
                        titleStory: dbStory.titleStory,
                        body: dbStory.body,
                        visible: dbStory.visible,
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
                        visible: dbStory.visible,
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

        edit(req, res) {
            const story = req.body;
            const place = {
                name: story.place,
            };

            const user = req.user;

            // story.user = {
            //     id: user._id,
            //     username: user.username,
            // };

            return Promise
                .all([
                    data.stories.findById(req.params.id),
                    data.places.findOrCreateBy(place),
                ])
                .then(([dbStory, dbPlaces]) => {
                    console.log(req.params.id);
                    // dbPlaces[0].name = story.place;
                    // dbPlaces[0].stories = dbPlaces[0].stories || [];
                    // dbPlaces.stories.push({
                    //     _id: dbStory._id,
                    //     titleStory: dbStory.titleStory,
                    //     body: dbStory.body,
                    //     visible: dbStory.visible,
                    // });

                    // dbStory.place = {
                    //     _id: dbPlaces._id,
                    //     name: dbPlaces.name,
                    // };

                    // user.stories = user.stories || [];
                    // user.stories.push({
                    //     _id: dbStory._id,
                    //     titleStory: dbStory.titleStory,
                    //     body: dbStory.body,
                    //     place: dbStory.place,
                    //     visible: dbStory.visible,
                    // });

                    return Promise.all([
                        data.stories.updateById(dbStory[0]),
                        data.places.updateById(dbPlaces),
                        data.users.updateById(user),
                    ]);
                })
                .then(() => {
                    return res.redirect('/stories');
                });
                // .catch((err) => {
                //     req.flash('error', err);
                //     return res.redirect('/stories/form');
                // });
        },

        delete(req, res) {
            return Promise
                .resolve(data.stories.findById(req.params.id))
                .then((dbStory) => {
                    dbStory[0].visible = false;
                    return Promise.resolve(
                        data.stories.updateById(dbStory[0])
                    );
                })
                .then(() => {
                    return res.redirect('/stories');
                })
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/stories/');
                });
        },
    };

    return controller;
};

module.exports = { init };
