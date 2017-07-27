const init = (data) => {
    const controller = {
        getUser(req, res) {
            return data.users.findById(+req.params.id)
                .then(() => {
                    //console.log(req.params.id);
                    return res.render('user', {
                    });
                });
        },
    };

    return controller;
};

module.exports = { init };
