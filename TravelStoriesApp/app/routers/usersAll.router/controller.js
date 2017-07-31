const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.users.getAll()
                .then((users) => {
                   // return res.send(users);
                    return res.render('usersAll', {
                        context: users,
                    });
                });
        },
    };
    return controller;
};

module.exports = { init };
