const init = (data) => {
    const controller = {
        getOne(req, res) {
            const userId = req.params.id;
            let currentUser;
            return data.users.findById(userId)
                .then((user) => {
                    currentUser = user;
                    return data.stories.findByIdsVisible(user.stories);
                })
                .then((stories) =>{
                    currentUser.stories = stories;
                    return res.render(
                        'user',
                        {
                             context: currentUser,
                             title: currentUser.username + '\'s Profile',
                        });
                });
        },
    };

    return controller;
};

module.exports = { init };
