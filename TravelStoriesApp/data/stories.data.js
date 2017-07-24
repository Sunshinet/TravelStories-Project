const BaseMongoDbData = require('./base/base.data');
const Storie = require('../models/stories');

class StoriesData extends BaseMongoDbData {
    constructor(db) {
        super(db, Storie, Storie);
    }
        _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = StoriesData;
