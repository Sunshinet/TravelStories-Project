const BaseMongoDbData = require('./base/base.data');
const Story = require('./stories.data');

class StoriesData extends BaseMongoDbData {
    constructor(db) {
        super(db, Story, Story);
    }
    getAllStories(){

    }
    getStoriesById(){

    }
    getStoryByAuthor(){

    }
    getStoryByTile()
}

module.exports = StoriesData;
