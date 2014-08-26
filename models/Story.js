var mongoose = require('mongoose');

var storySchema = new mongoose.Schema({
    authorName: {type: String},
    authorImageUrl: {type: String},
    content: {type: String},
    rating: {type: String},
    updated: { type: Date, default: Date.now },
    status: {type: String},//pending,approved,decline
    wasPushed:{type: Boolean, default: false},
    tags:[String]

});

module.exports = mongoose.model('Story', storySchema);