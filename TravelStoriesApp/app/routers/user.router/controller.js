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
                             title: 'My Profile',
                             context: currentUser,
                        });
                });
        },
    };

    return controller;
};

module.exports = { init };
