
var passportConf = require('../config/passport');
var apiController = require('../controllers/api');
var appController = require('../controllers/appController');


module.exports = function(app){
    app.get('/api/facebook', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getFacebook);
    app.get('/api/twitter', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.getTwitter);
    app.post('/api/twitter', passportConf.isAuthenticated, passportConf.isAuthorized, apiController.postTwitter);

    //Api server

    app.get('/api/protocol-details', appController.protocolDetails);

}