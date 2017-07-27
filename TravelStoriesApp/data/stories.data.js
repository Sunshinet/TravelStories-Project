const BaseMongoDbData = require('./base/base.data');
const Storie = require('../models/storie.model');
const { ObjectId } = require('mongodb');

class StoriesData extends BaseMongoDbData {
    constructor(db) {
        super(db, Storie, Storie);
    }

    findById(id) {
        return this.collection.find({
            _id: new ObjectId(id),
        })
            .toArray()
            .then((models) => {
                if (this.ModelClass.toViewModel) {
                    return models.map(
                        (model) => this.ModelClass.toViewModel(model)
                    );
                }

                return models;
            });
    }

    getByTitle(title) {
        return this
            .findOne({ titleStory: new RegExp(title, 'i') })
            .toArrey()
            .then(([tName]) => {
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

    _isModelValid(model) {
        return super._isModelValid(model);
    }
}

module.exports = StoriesData;
