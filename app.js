//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
let _ = require('lodash');

const homeStartingContent = "Welcome to my daily journal! I hope you are having a great day and reading my posts while you are cuddled with warm blanket and drinking a cup of tasty tea/coffee.. :) "
const aboutContent = "Hi! I'm a curious minded Web Developer and this is one of my practice projects where I will share daily contents with you! Best wishes, Lala Jumayeva.."
const contactContent = "You can contact me via my professional email address : "
const app = express();

app.set('view engine', 'ejs');



app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


let posts =[];


app.get("/", function(req, res){
  res.render("home", {paragraph: homeStartingContent,
  posts: posts});
  
})

app.get("/about", function(req, res){
  res.render("about", {about: aboutContent})
})

app.get("/contact", function(req, res){
  res.render("contact", {contact: contactContent})
})

app.get("/compose", function(req, res){
  res.render("compose")
})

app.get("/posts/:somepage", function(req, res){
  posts.forEach(function(post){
    let theTitle =  _.lowerCase(post.title)
    let search = _.lowerCase(req.params.somepage)
  if(theTitle.includes(search)){
    res.render("post", {
      Title: post.title,
      Text: post.text
    })
  }
})
  
})

app.post("/compose", function(req, res){
  
  const post = {
    title: req.body.Title,
    text: req.body.Text
  }

  posts.push(post);

  res.redirect("/")
})















app.listen(3000, function() {
  console.log("Server started on port 3000");
});
