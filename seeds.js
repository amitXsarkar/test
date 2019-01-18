var mongoose = require('mongoose');
var Campground = require('./models/campgrounds');
var Comments = require('./models/comments');

var data = [
    { 
        name: "Shillong", 
        image: "https://images.unsplash.com/photo-1482355347028-ff60443f60fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        desc: "This is a nice place"
    },
    { 
        name: "Darjeeling", 
        image: "https://images.unsplash.com/photo-1468956398224-6d6f66e22c35?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" ,
        desc: "This is a nice place"
    },
    { 
        name: "Shimla", 
        image: "https://images.unsplash.com/photo-1507777767380-68bdac55c642?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        desc: "This is a nice place"
    },
    { 
        name: "Manali", 
        image: "https://images.unsplash.com/photo-1496425745709-5f9297566b46?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        desc: "This is a nice place"
    }
]

function seedDB(){
    Campground.deleteMany({}, function (err) {
        console.log("campgrounds removed");
        for(var i=0; i < data.length ; i++){
            Campground.create(data[i],function(err,camp){
                if(err){
                    console.log(err);
                }else{
                    console.log("camp created ");
                    Comments.create(
                        {
                            text: "This is a comment",
                            author: "humour"
                        }
                        ,function(err,comment){
                            if(err){
                                console.log(err);
                            }else{
                                camp.comments.push(comment);
                                camp.save();
                                console.log("new comment created");
                            }
                    });
                }
            });
        }
    });
}

module.exports = seedDB;

