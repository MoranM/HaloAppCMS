var mongoose = require('mongoose');

var bgSchema = new mongoose.Schema({
    imageUrl: {type: String},
    name: {type: String},
    updated: { type: Date, default: Date.now },
    wasPushed:{type: Boolean, default: false},
    tags:[String]

});

module.exports = mongoose.model('Background', bgSchema);