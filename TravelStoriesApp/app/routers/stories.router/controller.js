const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.stories.getAll()
                .then((stories) => {
                    console.log(stories);
                    return res.render('stories/stories-all', {
                        context: stories,
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
