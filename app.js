//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const Lodash=require("lodash")

const  postSearch =require(__dirname+"/postSearch.js")

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const posts=[];
const postsLowerCaseTitle=[];
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/",(req,res)=>{
 
  
  res.render("home", {homeParagraph:homeStartingContent ,posts:posts, })
})


app.get("/contact",function(res,res)
{
  
  res.render("contact",{ContactParagraph:contactContent})
})
app.get("/about",function(res,res)
{
  res.render("about",{AboutParagraph:aboutContent})
})

app.get("/compose", (req,res)=>{
  res.render("compose")
})
app.post("/compose", (req, res)=>{

  let Readlink="posts/"+(req.body.titleCompose.replace(/\s+/g, '-').toLowerCase())

 
  const post={ 
    title:req.body.titleCompose,
    content:req.body.postCompose,
    link:Readlink
  }
  //console.log(post.link)
  posts.push(post)



  res.redirect("/")
})
app.get("/posts/:postName",function (req,res) {
  
  posts.forEach(post => {

    // js toLowercase() is needed because Lodash seperates the Capitalized letter with a space before turning them into lowercases. Lodash.lowercase() removes the dashes
    if (Lodash.lowerCase(req.params.postName.toLowerCase())=== Lodash.lowerCase(post.title.toLowerCase()
    ) ) {
  
  
     res.render("post", {content:post.content, title:post.title ,})
    
    }
  });
   //res.render("post", {content:"Either the post or the page has been taken down, or you are trying to access a page that does not exist!", title:"PAGE NOT FOUND :("})
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
// app.use(function (req, res) {
//   res.status(404).render('error');
// });