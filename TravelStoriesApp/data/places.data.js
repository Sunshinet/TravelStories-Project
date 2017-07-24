const BaseMongoDbData = require('./base/base.data');
const Place = require('../models/place.model');

class PlacesData extends BaseMongoDbData {
    constructor(db) {
        super(db, Place, Place);
    }
        _isModelValid(model) {
        return super._isModelValid(model);
    }
}

module.exports = PlacesData;
