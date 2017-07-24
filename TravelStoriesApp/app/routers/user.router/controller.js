const init = (data) => {
    const controller = {
        getUser(req, res) {
            return data.users.findById()
                .then(() => {
                    return res.render('user', {
                    });
                });
        },
    };

    return controller;
};


module.exports = { init };
