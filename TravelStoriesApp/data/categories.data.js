const BaseMongoDbData = require('./base/base.data');
const Category = require('../models/category.model');

class CategoriesData extends BaseMongoDbData {
    constructor(db) {
        super(db, Category, Category);
    }

    getByCategory(prop) {
        return this.collection
            .findOne({ name: prop })
            .then((res) => {
            });
    }

    _isModelValid(model) {
        return super._isModelValid(model);
    }
}

module.exports = CategoriesData;
