const init = (data) => {
    const controller = {
        getOne(req, res) {
            const userId = req.params.id;
            return data.users.findById(userId)
                .then((user) => {
                    return res.render(
                        'user',
                        {
                             title: 'My Profile',
                             user: user,
                        });
                });
        },
    };

    return controller;
};

module.exports = { init };
