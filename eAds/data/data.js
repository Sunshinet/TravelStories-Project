const StoryData = require('./stories.data');
const UsersData = require('./users.data');

const init = (db) => {
    return Promise.resolve({
        stories: new StoryData(db),
        users: new UsersData(db),
    });
};

module.exports = { init };
