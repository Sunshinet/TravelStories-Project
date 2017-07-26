const BaseMongoDbData = require('./base/base.data');
const Storie = require('../models/stories');

class StoriesData extends BaseMongoDbData {
    constructor(db) {
        super(db, Storie, Storie);
    }


     getByTitle(title) {
         return this
            .findOne({ titleStory: new RegExp(title, 'i') })
            .then(([tName]) => console.log(tName.titleStory + 'this is it'));
    }

       create(model) {
        // if (!this._isModelValid(model)) {
        //     return Promise.reject('Validation failed!');
        // }
        return this.collection.insert(model)
            .then(() => {
                return model;
            });
    }

        _isModelValid(model) {
        // custom validation 
       
        return super._isModelValid(model);
    }
}

module.exports = StoriesData;
