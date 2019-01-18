var express = require('express');
var router = express.Router();
var Campground = require('../models/campgrounds.js');
var middleware = require('../middleware');

router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});
//EDIT ROUTE
router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/edit", { campground: campground});
        }
    });
    
});

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });

});

//DELETE ROUTE
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership , function(req,res){
    Campground.findByIdAndDelete(req.params.id,function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds");
      
        }
    });
});

//CREATE ROUTE
router.post("/campgrounds", middleware.isLoggedIn, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username 
    };
    var newCamp = { name: name, image: image, desc: desc ,author: author};
    Campground.create(newCamp, function (err, campground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });

});

//INDEX ROUTE
router.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, allcampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allcampgrounds });
        }
    });

});

router.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, curcamp) {
        if (err) {
            console.log(err);
        } else{
            res.render("campgrounds/show", { campground: curcamp });
        }
    });
});


module.exports = router;