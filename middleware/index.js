var Campground = require('../models/campgrounds');
var Comment = require('../models/comments');
var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login first!");
    res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, campground) {
            if (err) {
                req.flash("error","Campground not found!");
                res.redirect("back");
            } else {
                if (campground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("You do not have permission to do that");
                    res.redirect("back");
                }
            }

        });
    } else {
        res.flash("error", "Please Login First!");
        res.redirect("/login");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function (err, comment) {
            if (err) {
                req.flash("error","Comment not found!");
                res.redirect("back");
            } else {
                if (comment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error","You do not have permission to do that");
                    res.redirect("back");
                }
            }

        });
    } else {
        res.flash("error","Please Login First!");
        res.redirect("/login");
    }
};

module.exports = middlewareObj;