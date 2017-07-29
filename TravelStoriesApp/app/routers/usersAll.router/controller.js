const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.users.getAll()
                .then((users) => {
                    console.log(users)
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
