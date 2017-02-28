var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport")

router.get("/", function(req,res){
    res.render("landing");
});

//auth routes
//show register form
router.get("/register", function(req,res){
    res.render("register");
})

router.post("/register", function(req,res){
    User.register(new User({username: req.body.username}), req.body.password, function(err,user){
        if (err){
            //console.log(err);
            req.flash("error", err.message);
            res.render("register");
        }else{
            passport.authenticate("local")(req,res, function(){
                req.flash("success", "Welcome to YelpCamp" + user.username);
                res.redirect("/campgrounds")
            })
        }
    })
});

//login
router.get("/login", function(req,res){
    res.render("login", {message: req.flash("error")});
})

router.post("/login", passport.authenticate("local", {
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}), function(req,res){
    
})

//logout
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success", "logged you out!");
    res.redirect("/");
})


module.exports = router;