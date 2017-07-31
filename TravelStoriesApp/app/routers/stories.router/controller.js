const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.stories.getAll()
                .then((stories) => {
                    stories.every((story) => {
                        return story.visible === false;
                    });

                    return res.render('stories/stories-all', {
                        title: 'All Stories',
                        context: stories,
                    });
                });
        },

        getOne(req, res) {
            return data.stories.findById(req.params.id)
                .then((story) => {
                    return res.render('stories/single-story',
                        { context: story[0] });
                });
        },

        getForm(req, res) {
            return Promise.resolve()
                .then(() => {
                    return res.render('stories/create-form');
                });
        },

        getEditForm(req, res) {
            return data.stories.findById(req.params.id)  // vzem story s id
                .then((result) => {
                    return res.render('stories/edit-form', {
                        context: result[0],
                    });
                });
        },

        create(req, res) {
            const story = req.body;
            story.visible = true;

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
                .then(([dbStory, dbPlace]) => {
                    dbPlace.name = story.place;
                    dbPlace.stories = dbPlace.stories || [];
                    dbPlace.stories.push(dbStory._id);

                    dbStory.place = {
                        _id: dbPlace._id,
                        name: dbPlace.name,
                    };

                    user.stories = user.stories || [];
                    user.stories.push(dbStory._id);

                    return Promise.all([
                        data.stories.updateById(dbStory),
                        data.places.updateById(dbPlace),
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

            const storyID = req.params.id;
            const user = req.user;

            story.user = {
                id: user._id,
                username: user.username,
            };

            return Promise
                .all([
                    data.stories.findById(storyID),
                    data.places.findOrCreateBy(place),
                ])
                .then(([dbStory, dbPlace]) => {
                    dbPlace.name = story.place;
                    dbPlace.stories = dbPlace.stories || [];
                    dbPlace.stories.push({
                        _id: dbStory[0]._id,
                        titleStory: story.titleStory,
                        body: story.body,
                        visible: true,
                    });

                    dbStory[0].place.name = place.name;
                    dbStory[0].titleStory = story.titleStory;
                    dbStory[0].body = story.body;

                    user.stories = user.stories || [];
                    user.stories.push({
                        _id: dbStory[0]._id,
                        titleStory: story.titleStory,
                        body: story.body,
                        place: story.place,
                        visible: true,
                    });

                    return Promise.all([
                        data.stories.updateById(dbStory[0]),
                        data.places.updateById(dbPlace),
                        data.users.updateById(user),
                    ]);
                })
                .then(() => {
                    return res.redirect('/stories');
                })
                .catch((err) => {
                    req.flash('error', err);
                    console.log(err);
                    return res.redirect('/stories/form');
                });
        },

        delete(req, res) {
            const storyID = req.params.id;

            return Promise
                .resolve(
                data.stories.findById(storyID),
            )
                .then((dbStory) => {
                    dbStory[0].visible = false;
                    console.log(dbStory[0]);
                    return Promise.resolve(
                        data.stories.updateById(dbStory[0]),
                    );
                })
                .then(() => {
                    return res.redirect('/stories');
                })
                .catch((err) => {
                    req.flash('error', err);
                    console.log(err);
                    return res.redirect('/stories/form');
                });
        },
    };

    return controller;
};

module.exports = { init };
