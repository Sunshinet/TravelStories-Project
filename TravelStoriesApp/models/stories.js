class Storie {
    static isValid(model) {
        return typeof model !== 'undefined' &&
            typeof model.titleStory === 'string' &&
            model.titleStory.length > 3 &&
            typeof model.body === 'string';
    }

    get id() {
        return this._id;
    }

    static toViewModel(model) {
        const viewModel = new Storie();
        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });

        return viewModel;
    }
}

module.exports = Storie;
