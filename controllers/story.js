var mongoose = require('mongoose');
var Story = require("../models/Story");
var ObjectId = mongoose.Types.ObjectId;

exports.getAllStories = function (req, res, next) {
    Story.find(function (err, stories) {
        if (err) return next(err);

        if (stories.length == 0) {
            req.flash('errors', {msg: "No stories found, please add story first."});
            res.redirect('/story/save-or-update');
        }

        res.render("story/all-stories", {
            title: 'Edit Stories',
            stories: stories
        })
    });
};

exports.deleteStory = function (req, res, next) {
    var storyId = req.params.id;
    if (!storyId) {
        req.flash('errors', {msg: "no story with matching id was found"});
        res.status(404).end();
    }

    Story.remove({ _id: storyId }, function (err) {
        if (!err) {
            req.flash('success', {msg: "Story was removed"});
            res.redirect("/story/all")
        }
        else {
            req.flash('errors', {msg: "Story was not removed. db-error:" + err});
            res.redirect("/story/all")
        }
    });
};

exports.getAddStory = function (req, res) {
    res.render('story/save-or-update', {
        title: 'Add Story'
    })
};

exports.editStory = function(req,res,next){
    var storyId = req.params.id;
    if (!storyId) {
        res.render('story/save-or-update', {
            title: 'Add Story'
        })
    }

    var _id = new ObjectId(storyId);
    Story.findById({_id: _id}, function (err, story) {
        if (err) return next(err)
        res.render('story/save-or-update', {
            story: story
        });
    })
};

exports.getStory = function (req, res, next) {
    var storyId = req.params.id;
    if (!storyId) {
        req.flash('errors', {msg: "no story with matching id was found"});
        res.status(404).end();
        return;
    }

    console.log(storyId);
    var _id = new ObjectId(storyId);
    Story.findById({_id: _id}, function (err, story) {
        if (err) return next(err)
        res.render('story/single-story-page', {
            story: story
        });
    })
};

exports.saveOrUpdate = function (req, res, next) {
    var storyId = req.body._id;

    if (storyId)
        return update(storyId, req, res, next);

    return save(req,res,next);
};

function update(storyId, req, res, next) {
    var authorImage = req.files.authorImage;
    if (authorImage) {
        var imageUrl = extractImage(authorImage);
    }

    var _id = new ObjectId(storyId);

    Story.findById({_id: _id}, function (err, story) {
        if (err) return next(err)

        story.authorName = req.body.authorName || story.authorName;
        story.content = req.body.content || story.content;
        story.authorImageUrl = authorImage ? imageUrl : story.authorImageUrl;

        story.save(function (err) {
            if (err) return next(err);
            console.log('story updated');
            req.flash('success', { msg: 'Story has been updated!' });
            res.redirect('/story/' + story._id);
        });
    });
};

function save(req, res, next) {
    req.assert('authorName', 'required').notEmpty();
    req.assert('content', 'Story body must be provided').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        res.redirect('/story/save-or-update');
    }

    var authorImage = req.files.authorImage;

    if (!authorImage) {
        req.flash('errors', {msg: "author image is required (until Shmulik provides default anonymous author image)"});
        return res.redirect('/story/save-or-update');
    }

    var story = new Story({
        authorName: req.body.authorName,
        content: req.body.content,
        authorImageUrl: extractImage(authorImage)
    });

    story.save(function (err) {
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

    var splited = path.split('\\');

    return "/" + splited[splited.length - 1];

};

