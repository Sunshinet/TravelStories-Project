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
       getByTitleName(req, res) {
           return data.stories.getByTitle(req.titleStory)
               .then((t) => {
                   console.log(t);
           });
       },
    };

    return controller;
};


module.exports = { init };
