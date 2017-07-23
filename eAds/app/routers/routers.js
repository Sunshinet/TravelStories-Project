const attachTo = (app, data) => {
    app.get('/', (req, res) => {
        return res.render('main', { title: 'TravellStories' });
    });

    app.get('/auth/register', (req, res) => {
        return res.render('auth/register', { title: 'reg' });
    });

    app.get('/auth/login', (req, res) => {
        return res.render('auth/login', { title: 'login' });
    });
};

module.exports = { attachTo };
