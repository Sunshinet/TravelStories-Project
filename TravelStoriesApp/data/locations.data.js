const BaseMongoDbData = require('./base/base.data');
const Location = require('../models/location.model');

class LocationsData extends BaseMongoDbData {
    constructor(db) {
        super(db, Location, Location);
    }

    getByLocation(prop) {
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

module.exports = LocationsData;
