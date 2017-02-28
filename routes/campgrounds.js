var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment")
var middleWare = require("../middleware")


//index
router.get("/", function(req,res){
    
    Campground.find({}, function(err, campGrounds){
        if (err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campGrounds: campGrounds});
        }
    });

});

//create
router.post("/",middleWare.isLoggedin, function(req,res){
    var author = {
        id: req.user._id,
        username:req.user.username
    }
    Campground.create({
        name: req.body.campgroundname, 
        image: req.body.campgroundimage,
        description: req.body.campgrounddescription,
        author : author
    }, function(err,campGround){
        if (err){
            console.log(err);
        }else{
            console.log("new campground added");
        }
    });
    res.redirect("/campgrounds");
});

//new
router.get("/new",middleWare.isLoggedin, function(req,res){
    res.render("campgrounds/new");
});

//REST Show Page - show more info on one campground
router.get("/:id", function(req,res){
    //retrieve addtional information from database
    //show addtional information about campsite
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(err, foundCampground){
      if (err){
          console.log(err);
      }else{
         // console.log(foundCampground)
          //res.send("testing");
          res.render("campgrounds/show", {campGround:foundCampground});
}})
})

//edit
router.get("/:id/edit",middleWare.isLoggedin, middleWare.correctUser2, function(req,res){
    var id = req.params.id;
    
    Campground.findById(id, function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/edit", {campGround: campground});
        }
    })
    
    
})

//update

router.put("/:id",middleWare.isLoggedin, middleWare.correctUser2, function(req,res){
    var id = req.params.id;
    //take edited form, 
    //find object by id=findOneidandupdate, 
    //redirect back to show page, do i want the person who edited the form? yeah but not yet 
    
    //still need to add a middleware to check that the proper user is logged in so it can't be attacked
    var campground = req.body.campground;
    
        Campground.findByIdAndUpdate( id, campground, function(err, campground){
        if (err){
            console.log(err);
        }else{
            res.redirect("/campgrounds/" + id)
        }
    })
})

//destroy
router.delete("/:id",middleWare.isLoggedin, middleWare.correctUser2, function(req,res){
    // res.send("destorying campground");
    
    Campground.findOneAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        }else{
            console.log("campground was deleted");
            res.redirect("/campgrounds");
        }
    })
})




module.exports = router;

