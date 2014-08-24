var userController = require('../controllers/user');


module.exports = function(app){
    app.get('/login', userController.getLogin);
    app.post('/login', userController.postLogin);
    app.get('/logout', userController.logout);
    app.get('/reset/:token', userController.getReset);
    app.post('/reset/:token', userController.postReset);
}
