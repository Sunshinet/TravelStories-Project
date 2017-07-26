const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/stories', (req, res) => {
        // return controller.getAll(req, res);
    });

    app.get('/stories/form', (req, res) => {
          if (!req.user) {
                return Promise.resolve()
                    .then(() => {
                        res.redirect('/auth/sign-in');
                    });
            }
       return controller.getForm(req, res);
    });
    app.get('/stories/single-story', (req, res) => { // get single story
      return controller.getStoryId(req, res);
        // return res.render('stories/single-story');
    });


    app.post('/stories', (req, res) => {
          if (!req.user) {
                return Promise.resolve()
                    .then(() => {
                        res.redirect('/auth/sign-in');
                    });
            }
        return controller.create(req, res);
    });
};


module.exports = { attachTo };
