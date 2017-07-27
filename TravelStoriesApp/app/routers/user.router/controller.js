const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.users.getAll()
                .then((users) => {
                    return res.send(users);
                    // console.log(users);
                    // return res.render('all.users', {
                    //     context: users,
                    // });
                });
        },

        getOne(req, res) {
            return data.users.findById(+req.params.id)
                .then(() => {
                    return res.render('user');
                });
        },
    };

    return controller;
};

module.exports = { init };
