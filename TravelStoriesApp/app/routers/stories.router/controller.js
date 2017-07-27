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
        getForm(req, res) {
            return Promise.resolve()
                .then(() => {
                    return res.render('stories/form');
                });
        },
        loadSinglePage(req, res) {
             return data.stories.filterBy()
            .then(() => {
               // console.log(req.params.id);
                return res.render('stories/single-story');
            });
        },
        create(req, res) {// create story and place(create or not) -----
            const story = req.body;// взиаме бодито на формата

            // validate item
            const place = {
                name: story.place,    //взиамме категория което е в боди
            };
            //  console.log(place);


            const user = req.user;     //взимаме юзъра, който го създава

            story.user = {              // създаваме в тудуто колекция юзър , която съзържа данните на юзъра
                id: user._id,
                username: user.username,
            };

            return Promise
                .all([
                    data.stories.create(story),
                    data.places.findOrCreateBy(place), //намери или създай, защото може вече да има такава категория //tuka ima bug?!?!?!?
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
                    console.log(user);

                    return Promise.all([
                        data.stories.updateById(dbStory),
                        data.places.updateById(dbPlaces),
                        data.users.updateById(user),
                    ]);
                })
                .then(() => {
                    // connect-flash
                    return res.redirect('/stories');
                })
                .catch((err) => {
                    req.flash('error', err);
                    return res.redirect('/stories/form');
                });
        },  //create story -----------------------------------------

    };


    return controller;
};


module.exports = { init };
