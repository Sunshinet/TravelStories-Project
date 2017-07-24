const StoryData = require('./stories.data');
const UsersData = require('./users.data');
const PlacesData = require('./places.data');

const init = (db) => {
    return Promise.resolve({
        stories: new StoryData(db),
        users: new UsersData(db),
        places: new PlacesData(db),
    });
};

module.exports = { init };
