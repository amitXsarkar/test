var express = require('express');
var router = express.Router();
var Campground = require('../models/campgrounds.js');
var Comment = require('../models/comments.js');
var middleware = require('../middleware');

//DELETE ROUTE
router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndDelete(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Successfully Deleted comment");
            res.redirect("back");
        }
    });
});

//EDIT ROUTE
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,comment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{camp_id: req.params.id,comment: comment});
        }
    });
    
});

router.put("/campgrounds/:id/comments/:comment_id/",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,comment){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Successfully Updated comment");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//CREATE ROUTE
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, camp) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", { camp: camp });
        }
    });
});

router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function (req, res) {
    Campground.findById(req.params.id, function (err, camp) {
        if (err) {
            console.log(err);
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                    req.flash("success", "Successfully Created comment");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        }
    });
});


module.exports = router;