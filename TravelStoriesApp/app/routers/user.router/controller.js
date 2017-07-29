const init = (data) => {
    const controller = {
        getOne(req, res) {
            return data.users.findById(+req.params.id)
                .then(() => {
                    return res.render('user', { title: 'My Profile' });
                });
        },
    };

    return controller;
};

module.exports = { init };
