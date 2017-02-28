var Comment = require("../models/comment")
var Campground = require("../models/campground")

var middleWareObj = {}


middleWareObj.isLoggedin = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please Login First!");
    res.redirect("/login")
}

middleWareObj.correctUser = function(req,res,next){
Comment.findById(req.params.commentId, function(err, comment){
    if(err){
         return console.log(err);
    }else{
        if(comment.author.id.equals(req.user._id)){
            return next();
        }
        req.flash("error", "You don't have permission to do that");
        return res.redirect("/");
    }
})
}

//checks to see if correct user is requesting access
middleWareObj.correctUser2 = function(req,res,next){
    //check to see if campground author has the same id as the person logged in
    Campground.findById(req.params.id, function(err, campground){
        if(err){
             return console.log(err);
        }else{
            if(req.user.username === campground.author.username){
                return next();
            }
            req.flash("error", "You don't have permission to do that");
            return res.redirect("/");
        }
    })
}

module.exports = middleWareObj;