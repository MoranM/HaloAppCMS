var User = require('../models/User');


exports.registerAdmins = function(email, password){
    var user = new User({
        email: email,
        password: password
    });

    User.findOne({ email: email }, function(err, existingUser) {
        if (!existingUser) {
            user.save();
        }
    });
};