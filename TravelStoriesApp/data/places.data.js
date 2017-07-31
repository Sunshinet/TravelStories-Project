const BaseMongoDbData = require('./base/base.data');
const Place = require('../models/place.model');

class PlacesData extends BaseMongoDbData {
    constructor(db) {
        super(db, Place, Place);
    }

    getByPlace(prop) {
        return this.collection
            .findOne({ name: prop })
            // .toArrey()
            .then((res) => {
            });
    }

    _isModelValid(model) {
        return super._isModelValid(model);
    }
}

module.exports = PlacesData;
