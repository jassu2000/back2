const express= require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(("mongodb://localhost:27017/todolistDB"), { useNewUrlParser: true }) ;
const app = express();
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine","ejs");
// var item = [];

// const founditem = [];
const itemsSchema = {
    name:String
};
const Item = mongoose.model("Item", itemsSchema);
const item1= new Item({
     name:"preeti"
});
const item2= new Item({
    name:"kriti"
});
const item3= new Item({
    name:"srishti"
});
const defaultitems=[item1,item2,item3];   
app.get("/", function(req,res){
    
    var options={
        weekday:"long",
        month:"long",
        day:'numeric'
    };
    var today = new Date();
   
    var day = today.toLocaleDateString("en-US",options);

    
Item.find({}, function(err,founditems){
    if(founditems.length === 0){
        Item.insertMany(defaultitems,function(err){
            if(err){
                console.log(err);
                //     res.redirect("/");
            }
            else{
                console.log("success");
            }
        });
            res.redirect("/");
            }
    else{
        res.render("List",{kindofday:day,newlistitems:founditems});       
        }
    });
});

// });
app.post("/", function(req,res){

const  itemname = req.body.newitem;
const item = new Item({
name:itemname
});
item.save();
res.redirect("/");
});
app.listen(3000,function(){
    console.log("server started at the port 3000");
});