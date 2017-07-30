/* globals __dirname */


const attachTo = (app, data) => {
    const controller = require('./controller').init(data);

    app.get('/user', (req, res) => {
        return controller.getAll(req, res);
    });

    app.get('/user/:id', (req, res) => {
        return controller.getOne(req, res);
    });

    const multer = require('multer');

    const storage = multer.diskStorage({
        destination: function(req, file, callback) {
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
        filename: function(req, file, callback) {
            callback(
                null,
                req.session.passport.user
            );
        },
    });

    const upload = multer({ storage: storage })
        .single('avatar');

    app.get('/', function(req, res) {
        res.sendFile(__dirname + '/index.html');
    });

    app.post('/user/avatar', function(req, res) {
        upload(req, res, function(err) {
            if (err) {
                return res.end('' + err);
            }
            return res.end('File is uploaded');
        });
    });
};

module.exports = { attachTo };
