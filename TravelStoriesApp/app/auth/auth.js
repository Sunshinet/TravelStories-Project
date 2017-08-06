const session = require('express-session');
const passport = require('passport');
const { Strategy } = require('passport-local');
const MongoStore = require('connect-mongo')(session);
const md5 = require('js-md5');

const config = require('../../server.config');

const applyTo = (app, data) => {
    passport.use(new Strategy((username, password, done) => {
        const pass = md5(password);
        data.users.checkPassword(username, pass)
            .then(() => {
                return data.users.findByUsername(username);
            })
            .then((user) => {
                done(null, user);
            })
            .catch((err) => {
                done(err);
            });
    }));

    app.use(session({
        store: new MongoStore({ url: config.connectionString }),
        secret: config.sessionSecret,
        resave: true,
        saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((id, done) => {
        data.users.findById(id)
            .then((user) => {
                done(null, user);
            }).catch(done);
    });

    app.use((req, res, next) => {
        res.locals = {
            user: req.user,
        };

        next();
    });
};

module.exports = { applyTo };
