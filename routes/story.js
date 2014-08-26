var storyController = require('../controllers/story');
var passportConf = require('../config/passport');

module.exports = function(app){
   app.get('/story/add', passportConf.isAuthenticated, storyController.getAddStory);
   app.post('/story/add', passportConf.isAuthenticated, storyController.postAddStory);
}