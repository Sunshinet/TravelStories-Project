const express = require('express');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const init = (data) => {
    const app = express();

    require('./config').applyTo(app);
    require('./auth').applyTo(app, data);

    app.use(cookieParser('keyboard cat'));
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true },
    }));
    app.use(flash());
    // app.use((req, res, next) => {
    //     res.locals.messages = require('express-messages')(req, res);
    //     next();
    // });

    require('./routers')
        .attachTo(app, data);

    return Promise.resolve(app);
};

module.exports = {
    init,
};
