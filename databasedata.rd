Campground.create({
    name: "Salmon Creek", 
    image: "https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg",
    description: "This is a huge granite hill, no bathrooms. No water. Beautiful Granite!"
}, function(err, campGrounds){
    if(err){
        console.log(err);
    }
})

Campground.create({
name: "Granite Hill", image: "https://farm1.staticflickr.com/130/321487195_ff34bde2f5.jpg", 
description: "Bacon ipsum dolor amet brisket andouille tri-tip cow. Shoulder cupim sirloin pork chop, short ribs jerky short loin porchetta beef ribs jowl spare ribs drumstick cow andouille biltong. Kevin t-bone ball tip shank salami beef, tongue ground round pork belly. Ham hock short loin porchetta biltong sausage pork loin shankle chuck ground round boudin bresaola hamburger kielbasa venison short ribs. Salami corned beef spare ribs picanha pork ham cow ground round jerky burgdoggen."
}, function(err, campGrounds){
    if(err){
        console.log(err);
    }
})

Campground.create({
name: "MG Rest", image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
description: "Landjaeger pork chop kielbasa turducken boudin shank. Fatback strip steak filet mignon beef ribs, leberkas venison picanha corned beef cow. Shank alcatra swine, venison beef cupim landjaeger andouille capicola. Beef beef ribs sirloin drumstick bresaola picanha andouille pig tri-tip boudin kevin cupim short loin filet mignon shankle. Landjaeger pig jerky, kielbasa porchetta cupim shoulder. Shankle rump landjaeger, prosciutto tail cow kielbasa spare ribs andouille chicken."
}, function(err, campGrounds){
    if(err){
        console.log(err);
    }
})