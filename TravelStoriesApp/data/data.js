const StoryData = require('./stories.data');
const UsersData = require('./users.data');
const LocationsData = require('./locations.data');

const init = (db) => {
    return Promise.resolve({
        stories: new StoryData(db),
        users: new UsersData(db),
        locations: new LocationsData(db),
    });
};

module.exports = { init };
