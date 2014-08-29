var storyController = require('../controllers/story');
var passportConf = require('../config/passport');

module.exports = function (app) {
    app.get('/story/add', passportConf.isAuthenticated, storyController.getAddStory);
    app.post('/story/add', passportConf.isAuthenticated, storyController.postAddStory);
    app.get('/story/all', passportConf.isAuthenticated, storyController.getAllStories);
    app.get('/story/:id', passportConf.isAuthenticated, storyController.getStory);
    app.get('/story/delete/:id', passportConf.isAuthenticated, storyController.deleteStory);
}