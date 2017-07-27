const BaseMongoDbData = require('./base/base.data');
const Storie = require('../models/stories');
const { ObjectId } = require('mongodb');

class StoriesData extends BaseMongoDbData {
    constructor(db) {
        super(db, Storie, Storie);
    }


     getByTitle(title) {
         return this
            .findOne({ titleStory: new RegExp(title, 'i') })
            .toArrey()
            .then(([tName]) =>{
                return tName;
            });
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

    findById(id) {
        return this.collection.findOne({
            _id: new ObjectId(id),
        });
    }

        _isModelValid(model) {
        // custom validation 
       
        return super._isModelValid(model);
    }
}

module.exports = StoriesData;
