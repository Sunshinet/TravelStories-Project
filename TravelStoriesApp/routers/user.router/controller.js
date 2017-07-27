const init = (data) => {
    const controller = {
        getUser(req, res) {
            return data.users.findById(+req.params.id)
                .then(() => {
                    return res.render('user', {
                    });
                });
        },
        getAll(req, res) {
            return data.users.getAll()
            .then((users)=>{
                return res.send(users);
                //console.log(users);
                // return res.render('all.users', {
                //     context: users,
                // });
            });
       },
    };

    return controller;
};

module.exports = { init };
