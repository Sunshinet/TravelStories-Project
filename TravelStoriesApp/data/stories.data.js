const BaseMongoDbData = require('./base/base.data');
const Storie = require('../models/stories');

class StoriesData extends BaseMongoDbData {
    constructor(db) {
        super(db, Storie, Storie);
    }

     getByTitle(title) {
         return this
            .findOne({ titleStory: new RegExp(title, 'i') })
            .then(([tName]) => console.log(tName));
    }

        _isModelValid(model) {
        // custom validation 
        console.log(model);
        return super._isModelValid(model);
    }
}

module.exports = StoriesData;
