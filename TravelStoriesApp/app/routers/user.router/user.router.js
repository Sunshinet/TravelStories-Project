/* globals __dirname */


const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/user', (req, res) => {
        return controller.getOne(req, res);
    });

    app.get('/user/:id', (req, res) => {
        return controller.getOne(req, res);
    });

    const multer = require('multer');

    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            data.users.findById(req.session.passport.user)
            .then((user) => {
                user.hasAvatar = true;
                data.users.updateById(user);
            });
            callback(
                null,
                './public/avatars'
            );
        },
        filename: (req, file, callback) => {
            callback(
                null,
                req.session.passport.user
            );
        },
    });

    const upload = multer({ storage: storage })
        .single('avatar');

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html');
    });

    app.post('/user/avatar', (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                return res.end('' + err);
            }
            const context = req.user;
            context.stories = data.stories.findByIdsVisible(req.user.stories);
            context.hasAvatar = true;
            return res.render('user', { context: context });
        });
    });
};

module.exports = { attachTo };
