var bgController = require('../controllers/background');
var passportConf = require('../config/passport');

module.exports = function (app) {
    app.get('/background/all', passportConf.isAuthenticated, bgController.getAllBackgrounds);
    app.get('/background/add', passportConf.isAuthenticated, bgController.getAddBackground);
    app.post('/background/add', passportConf.isAuthenticated, bgController.postAddBackground);
    app.get('/background/delete/:id', passportConf.isAuthenticated, bgController.deleteBackground);


    //Api server

    app.get('/api/background/all', bgController.getAllBackgroundsJson);
}