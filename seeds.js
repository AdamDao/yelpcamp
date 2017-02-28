var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
//removed campground

var data = [
        {
        name: "Cloud's Rest", 
        image: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?dpr=1.5&auto=format&fit=crop&w=767&h=510&q=80&cs=tinysrgb&crop=",
        description: "Spicy jalapeno bacon ipsum dolor amet picanha kevin pork belly kielbasa tail doner. Sirloin strip steak spare ribs, beef ribs shoulder swine kielbasa picanha pork belly ham hock landjaeger t-bone doner. Kevin jerky fatback ground round ham salami pig ribeye drumstick porchetta prosciutto. Short loin bacon turkey, pastrami porchetta capicola shoulder meatball kevin spare ribs cow ribeye. Hamburger landjaeger andouille t-bone shank, pig drumstick meatball pastrami. Venison pork bacon landjaeger shoulder picanha frankfurter hamburger tongue meatloaf pig. Meatloaf strip steak short ribs kielbasa pork belly. Leberkas turkey ham, frankfurter ham hock cow jerky porchetta. Corned beef biltong burgdoggen brisket andouille salami strip steak kevin boudin drumstick meatloaf chuck doner. Andouille ball tip alcatra meatball pancetta."
        },        
        {
        name: "Night's Whisper", 
        image: "https://images.unsplash.com/photo-1432817495152-77aa949fb1e2?dpr=1.5&auto=format&fit=crop&w=767&h=512&q=80&cs=tinysrgb&crop=",
        description: "Spicy jalapeno bacon ipsum dolor amet picanha kevin pork belly kielbasa tail doner. Sirloin strip steak spare ribs, beef ribs shoulder swine kielbasa picanha pork belly ham hock landjaeger t-bone doner. Kevin jerky fatback ground round ham salami pig ribeye drumstick porchetta prosciutto. Short loin bacon turkey, pastrami porchetta capicola shoulder meatball kevin spare ribs cow ribeye. Hamburger landjaeger andouille t-bone shank, pig drumstick meatball pastrami. Venison pork bacon landjaeger shoulder picanha frankfurter hamburger tongue meatloaf pig. Meatloaf strip steak short ribs kielbasa pork belly. Leberkas turkey ham, frankfurter ham hock cow jerky porchetta. Corned beef biltong burgdoggen brisket andouille salami strip steak kevin boudin drumstick meatloaf chuck doner. Andouille ball tip alcatra meatball pancetta."
        },        
        {
        name: "Sky Echo", 
        image: "https://images.unsplash.com/photo-1482355347028-ff60443f60fe?dpr=1.5&auto=format&fit=crop&w=767&h=511&q=80&cs=tinysrgb&crop=",
        description: "Spicy jalapeno bacon ipsum dolor amet picanha kevin pork belly kielbasa tail doner. Sirloin strip steak spare ribs, beef ribs shoulder swine kielbasa picanha pork belly ham hock landjaeger t-bone doner. Kevin jerky fatback ground round ham salami pig ribeye drumstick porchetta prosciutto. Short loin bacon turkey, pastrami porchetta capicola shoulder meatball kevin spare ribs cow ribeye. Hamburger landjaeger andouille t-bone shank, pig drumstick meatball pastrami. Venison pork bacon landjaeger shoulder picanha frankfurter hamburger tongue meatloaf pig. Meatloaf strip steak short ribs kielbasa pork belly. Leberkas turkey ham, frankfurter ham hock cow jerky porchetta. Corned beef biltong burgdoggen brisket andouille salami strip steak kevin boudin drumstick meatloaf chuck doner. Andouille ball tip alcatra meatball pancetta."
        }
    ]

function seedDB(){
    //remove
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("campgrounds removed");
            //add new campground
            data.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if (err){
                    console.log(err);
                }else{
                   console.log("added campgrond");
                   Comment.create(
                       {
                           text: "This place is great!",
                           author:{username: "Homer"}
                       }, function(err, comment){
                           if(err){
                               console.log(err);
                           }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("created a comment");
                           }
                       })
                }
            });
        })
        };
    })


}




module.exports = seedDB;