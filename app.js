const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/feedbackDB", { useNewUrlParser: true }, mongoose.set('strictQuery', false));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const feedBackSchema = {
    name :String,
    email : String,
    rating : Number,
    like : String,
    improve : String
}

const feedBack = mongoose.model("feedback", feedBackSchema);

app.get("/", function (req, res) {
    res.render("form");
})

app.post("/",function(req,res){
    const {name,email,rating,like,improve}=req.body;
    const feed=new feedBack({
        name : name,
        email : email,
        rating : rating,
        like : like,
        improve : improve
    })

    const savedFeed = feed.save();
    savedFeed.then(()=> {
        res.send("Feedback successfully submited!!!")
    }).catch((err)=>{
        res.send(err);
    })
});


app.listen(3000, function () {
    console.log("Server started on port 3000");
});
