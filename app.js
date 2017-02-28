var express = require("express");
var app = express();
var bodyParser= require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require ("passport-local");
var flash = require("connect-flash")
//models
var Campground = require("./models/campground")
var Comment = require("./models/comment")
var User = require ("./models/user")
var seedDB = require("./seeds")
//require routes
var commentRoutes = require("./routes/comments")
var campgroundRoutes = require("./routes/campgrounds")
var indexRoutes = require("./routes/index")

var methodOverride = require("method-override");


mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));
app.use(flash());

//seedDB();

//passport configuration
app.use(require("express-session")({
    secret: "water is wet, but only when touched",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=========
//middleware for checking to see if logged in this for navbar
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})




app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use("/campgrounds",campgroundRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    
    console.log("sever has started");
})