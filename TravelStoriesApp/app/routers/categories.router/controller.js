const init = (data) => {
    const controller = {
        getAll(req, res) {
            return data.categories.getAll()
                .then((categories) => {
                    return res.render('categories/all-categories', {
                        title: 'All Categories',
                        context: categories,
                    });
                });
        },

        getOne(req, res) {
            let currentCategorie;
            return data.categories.findById(req.params.id)
                .then((categories) => {
                    currentCategorie = categories[0];
               return data.stories.findByIdsVisible(currentCategorie.stories);
                })
                .then((stories) => {
                    currentCategorie.stories = stories;
                    return res.render('categories/single-category', {
                        title: 'One Category',
                        context: currentCategorie,
                    });
                });
        },

        getByTitle(req, res) {
            const name = req.params.name;
            return data.categories.getByCategory(name)
                .then((result) => {
                });
        },
    };

    return controller;
};


module.exports = { init };
