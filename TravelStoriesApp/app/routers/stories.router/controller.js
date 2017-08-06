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
            return data.stories.findById(req.params.id) // vzem story s id
                .then((result) => {
                    return res.render('stories/edit-form', {
                        context: result[0],
                    });
                });
        },

        create(req, res) {
            const story = req.body;
            story.visible = true;

            const location = {
                name: story.location,
            };

            const category = {
                name: story.categoryStory,
            };

            const user = req.user;


            story.user = {
                id: user._id,
                username: user.username,
            };

            return Promise
                .all([
                    data.stories.create(story),
                    data.locations.findOrCreateBy(location),
                    data.categories.findOrCreateBy(category),
                ])
                .then(([dbStory, dbLocation, dbCategory]) => {
                    dbLocation.name = story.location;
                    dbLocation.stories = dbLocation.stories || [];
                    dbLocation.stories.push(dbStory._id);

                    dbStory.location = {
                        _id: dbLocation._id,
                        name: dbLocation.name,
                    };

                    dbStory.categoryStory = {
                        _id: dbCategory._id,
                        name: dbCategory.name,
                    };

                    dbCategory.name = story.categoryStory;
                    dbCategory.stories = dbCategory.stories || [];
                    dbCategory.stories.push(dbStory._id);
                    user.stories = user.stories || [];
                    user.stories.push(dbStory._id);

                    return Promise.all([
                        data.stories.updateById(dbStory),
                        data.locations.updateById(dbLocation),
                        data.users.updateById(user),
                        data.categories.updateById(dbCategory),
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
            const location = {
                name: story.location,
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
                    data.locations.findOrCreateBy(location),
                ])
                .then(([dbStory, dbLocation]) => {
                    dbLocation.name = story.location;
                    dbLocation.stories = dbLocation.stories || [];
                    dbLocation.stories.push({
                        _id: dbStory[0]._id,
                        titleStory: story.titleStory,
                        body: story.body,
                        visible: true,
                    });

                    dbStory[0].location.name = location.name;
                    dbStory[0].titleStory = story.titleStory;
                    dbStory[0].body = story.body;

                    user.stories = user.stories || [];
                    user.stories.push({
                        _id: dbStory[0]._id,
                        titleStory: story.titleStory,
                        body: story.body,
                        location: story.location,
                        visible: true,
                    });

                    return Promise.all([
                        data.stories.updateById(dbStory[0]),
                        data.locations.updateById(dbLocation),
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
            const storyID = req.params.id;

            return Promise
                .resolve(
                data.stories.findById(storyID),
            )
                .then((dbStory) => {
                    dbStory[0].visible = false;
                    return Promise.resolve(
                        data.stories.updateById(dbStory[0]),
                    );
                })
                .then(() => {
                    return res.redirect('/stories');
                })
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/stories/form');
                });
        },
    };

    return controller;
};

module.exports = { init };
