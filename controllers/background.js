var imageService = require("../services/imageService");
var Background = require("../models/Background");


exports.getAddBackground = function (req, res, next) {
    res.render("background/add-bg", {
        title: "New Image Background"
    });
};

exports.postAddBackground = function (req, res, next) {
    var bgImage = req.files.background;

    if (!bgImage) {
        req.flash('errors', {msg: "Please Provide valid background image!"});
        return res.redirect('/background/add');
    }

    var bg = new Background({
        imageUrl: imageService.extractImagePath(bgImage),
        name: bgImage.name
    });

    bg.save(function (err) {
        if (err) return next(err);
        console.log('story saved');
        req.flash('success', { msg: 'Background image has been saved!' });
        res.redirect('/background/add');
    });
};

exports.deleteBackground = function (req, res, next) {
    var bgId = req.params.id;
    if (!bgId) {
        req.flash('errors', {msg: "no background with matching id was found"});
        res.status(404).end();
    }

    Background.remove({ _id: bgId }, function (err) {
        if (!err) {
            req.flash('success', {msg: "Background was removed"});
            res.redirect("/background/all")
        }
        else {
            req.flash('errors', {msg: "Background was not removed. db-error:" + err});
            res.redirect("/background/all")
        }
    });
};

exports.getAllBackgroundsJson = function (req, res, next) {
    Background.distinct("imageUrl")
        .exec(function (err, images) {
            if (err || images.length == 0) {
                res.json({});
            }
            res.json(images);
        });
};

exports.getBackgroundsJson = function (req, res, next) {
    var page = req.param("page") || 0;
    var pageSize = req.param("pageSize") || 10;

    Background.find()
        .select("imageUrl")
        .limit(pageSize)
        .skip(page * pageSize)
        .exec(function (err, backgrounds) {
            if (err) return next(err);

            res.json({
                backgrounds:backgrounds
            });
        });
};

exports.getAllBackgrounds = function (req, res, next) {
    Background.find(function (err, backgrounds) {
        if (err) return next(err);

        if (backgrounds.length == 0) {
            req.flash('errors', {msg: "No backgrounds found, please add backgrounds first."});
            res.redirect('/background/add');
        }

        res.render("background/all-bg", {
            title: 'All Backgrounds',
            backgrounds: backgrounds
        })
    });
};
