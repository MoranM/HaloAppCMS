var mongoose = require('mongoose');
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
        imageUrl: extractImage(bgImage),
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

function extractImage(image) {
    //todo: Extract to service
    var path = image.path;
    path = path.replace(/\\/g,'/');
    var spliced = path.split('/');

    return "/" + spliced[spliced.length - 1];
};