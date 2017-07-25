const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/stories', (req, res) => {
        // auth
        return controller.getAll(req, res);
    });

    app.get('/stories/form', (req, res) => {
        return res.render('stories/form');
    });
    app.get('/stories/single-story', (req, res) => { // get single story
        console.log(res);
      return controller.getByTitleName(req, res);
        // return res.render('stories/single-story');
    });


    app.post('/stories', (req, res) => {
        const story = req.body;
        // validate item
        return data.stories.create(story)
            .then((dbStory) => {
                return res.redirect('/stories');
            })
            .catch((err) => {
                // connect-flash
                req.flash('error', err);
                return res.redirect('/stories/form');
            });
    });
};

module.exports = { attachTo };
