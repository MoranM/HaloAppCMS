var passportConf = require('../config/passport');
var userController = require('../controllers/user');


module.exports = function(app){
    app.get('/account', passportConf.isAuthenticated, userController.getAccount);
    app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
    app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
    app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
    app.get('/account/unlink/:provider', passportConf.isAuthenticated, userController.getOauthUnlink);
    //app.get('/contact', contactController.getContact);
    //app.post('/contact', contactController.postContact);

}