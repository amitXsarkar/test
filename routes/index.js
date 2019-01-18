var express = require('express');
var router = express.Router();
var User = require('../models/users.js'); 
var passport = require('passport');


//===================
//AUTH ROUTES
//===================


router.get("/register", function (req, res) {
    res.render("register");
});

router.post("/register", function (req, res) {
    var newUser = new User({ username: req.body.username });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            req.flash("error",err.message);
            res.redirect("back");
        } else {
            passport.authenticate("local")(req, res, function () {
                req.flash("success","Welcome to YelpCamp "+user.username);
                res.redirect("/campgrounds");

            });
        }
    });
});

router.get("/login", function (req, res) {

    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function (req, res) {

});

router.get("/logout", function (req, res) {
    req.logout();
    req.flash("success","Logged out successfully");
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;