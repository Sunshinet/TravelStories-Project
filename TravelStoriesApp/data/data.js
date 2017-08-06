const StoryData = require('./stories.data');
const UsersData = require('./users.data');
const LocationsData = require('./locations.data');
const CategoriesData = require('./categories.data');

const init = (db) => {
    return Promise.resolve({
        stories: new StoryData(db),
        users: new UsersData(db),
        locations: new LocationsData(db),
        categories: new CategoriesData(db),
    });
};

module.exports = { init };
