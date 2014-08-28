
var mongoose = require('mongoose');
var Story = require("../models/Story");
var ObjectId = mongoose.Types.ObjectId;

exports.getAllStories = function(req, res){

};

exports.getAddStory = function(req, res){
    res.render('story/add',{
        title:'Add Story'
    })
};

exports.getStory = function(req,res,next){
    var storyId = req.params.id;
    if(!storyId){
        req.flash('errors', {msg: "no story with matching id was found"});
        res.status(404).end();
        return;
    }

    console.log(storyId);
    var _id =  new ObjectId(storyId);
    Story.findById({_id:_id},function(err, story){
        if(err) return next(err)
        res.render('story/single-story-page',{
            story: story
        });
    })
};

exports.postAddStory = function(req, res, next){
    req.assert('authorName', 'required').notEmpty();
    req.assert('content', 'Story body must be provided').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        res.redirect('/story/add');
    }

    var authorImage = req.files.authorImage;

    if(!authorImage){
        req.flash('errors', {msg: "author image is required (until Shmulik provides default anonymous author image)"});
        return res.redirect('/story/add');
    }

    var story = new Story({
        authorName: req.body.authorName,
        content: req.body.content,
        authorImageUrl: extractImage(authorImage)
    });

    story.save(function(err) {
        if (err) return next(err);
        console.log('story saved');
        req.flash('success', { msg: 'Story has been saved!' });
        res.redirect('/story/' + story._id);
    });
};



function extractImage(authorImage) {
    //todo: add logic which saves the image to other location on disk.
    //or check if the path can be set in advance.
    var path = authorImage.path;

    var splited =  path.split('\\');

    return "/" + splited[splited.length -1];

}
