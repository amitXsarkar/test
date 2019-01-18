var express = require("express");
var app = express();
var methodOverride = require('method-override');
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var passport = require('passport');
var LocalStrategy = require('passport-local');
var Campground = require('./models/campgrounds');
var Comment = require("./models/comments");
var User    = require('./models/users.js');
var flash = require('connect-flash');
var seedDB =require('./seeds')

var campgroundRoutes = require('./routes/campgrounds.js');
var commentRoutes = require('./routes/comments.js');
var indexRoutes = require('./routes/index.js');

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

app.use(flash());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/puclic"));
app.use(express.static("puclic"));
app.use(methodOverride("_method"));
app.set("view engine","ejs");
//seedDB();



//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.curruser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(3000,function(){
    console.log("Yelpcamp Started!!!");
});
