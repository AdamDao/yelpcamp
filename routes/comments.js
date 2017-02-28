var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment")
//no need for index.js for middle ware, index is special
var middleWare = require("../middleware")

//===============Comment routes
router.get("/new",middleWare.isLoggedin, function(req,res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        }else{
            res.render('comments/new', {campGround: campground})
        }
    })
})

//comment create
router.post("/", middleWare.isLoggedin, function(req,res){
    //take comment from form and add it to campground object with id in url
    Campground.findById(req.params.id,function(err, campground){
        if (err){
            console.log(err);
        }else{
            //creating comment then adding it to proper campground object in callback
            Comment.create(req.body.comment,function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    
                    req.flash("success", "Successfully Added Comment");
                    res.redirect("/campgrounds/" + req.params.id)
                }
            });

        }
    })
});

//edit

router.get("/:commentId/edit", function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if (err){
            console.log(err);
        }else{
            Comment.findById(req.params.commentId, function(err, comment){
                if (err){
                    console.log(err);
                }else{
                    res.render("comments/edit", {campGround: campground, comment: comment});
                }
            })
        }
    })
    //find comment by id
    //edit comment
    //object should reflect change since it just stores the id
})
//update
router.put("/:commentId", function(req,res){
    // res.send("updating comment");
    // console.log(req.body.text);
    // console.log(req.params.commentId);
    Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, function(err, comment){
        if (err){
            console.log(err);
        }else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})
//destory

router.delete("/:commentId",middleWare.isLoggedin, middleWare.correctUser, function(req,res){
    // res.send("delete page!");
    Comment.findByIdAndRemove(req.params.commentId, function(err, comment){
        if (err){
            res.redirect("back")
        }else{
            req.flash("success", "Comment Deleted");
            res.redirect("/campgrounds/" + req.params.id)
        }
    });

})


module.exports = router;