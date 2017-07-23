const StoryData = require('./stories.data');
const init = (db) => {
    return Promise.resolve({
        stories: new StoryData(db),

    });
};

module.exports = { init };
