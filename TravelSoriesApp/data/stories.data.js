const BaseMongoDbData = require('./base/base.data');
const Stories = require('../models/stories');

class StoriesData extends BaseMongoDbData {
    constructor(db) {
        super(db, Stories, Stories);
    }
        _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = StoriesData;
