var storyController = require('../controllers/story');
var passportConf = require('../config/passport');

module.exports = function (app) {
    //CMS server

    app.get('/story/save-or-update/', passportConf.isAuthenticated, storyController.getAddStory);
    app.post('/story/save-or-update', passportConf.isAuthenticated, storyController.saveOrUpdate);
    app.get('/story/get-all-authors-images', passportConf.isAuthenticated, storyController.getAllAuthorsImages);

    app.get('/story/all', passportConf.isAuthenticated, storyController.getAllStories);
    app.get('/story/:id', passportConf.isAuthenticated, storyController.getStory);
    app.get('/story/edit/:id', passportConf.isAuthenticated, storyController.editStory);
    app.get('/story/delete/:id', passportConf.isAuthenticated, storyController.deleteStory);

    //App Server

    app.get('/api/story/all', storyController.getAllStoriesJson);
}