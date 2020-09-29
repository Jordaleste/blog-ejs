const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent =
    "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent =
    "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent =
    "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

//global variables
let posts = [];

//lodash. Set up with npm install lodash. Named _, or "low dash".
//lodash is used for array / object manipulation
//Good practice is to not install entire dependency for single use situations if vanilla js can handle the task, 
//However, we install and use lodash here for teaching moment
//With lodash, we can install only part we need for less bloat. ex: require("lodash/lowercase")
const _ = require("lodash");

app.set("view engine", "ejs");

//gives us access to req.body properties
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//home page
app.get("/", function (req, res) {
    res.render("home", { openingContent: homeStartingContent, posts: posts });
    
});

app.get("/about", function (req, res) {
    res.render("about", { aboutIntro: aboutContent });
});

app.get("/contact", function (req, res) {
    res.render("contact", { contactIntro: contactContent });
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

//Here we are using Route parameters (params) to capture whatever URL is added to our posts route (dynamic URL).
//We get the data from the parameters with req.params.'name of parameter'.
app.get("/posts/:postID", function(req, res) {

    //_.kebabCase is a Lowdash function.
    //could also use standard js. post.title.replace(' ', '-').toLowerCase(). Better practice then to install entire library for single use.
    //Here we are using Lodash as a teaching moment.
    const requestedTitle = _.lowerCase(req.params.postID);

    posts.forEach(post => {
        const storedTitle = _.lowerCase(post.title);
        if (requestedTitle === storedTitle) {
           res.render("posts", { postTitle: post.title, postContent: post.content})
        } 
    });

})

// post requests must come from inside a form
app.post("/compose", function (req, res) {
    const post = {
        title: req.body.postTitle,
        content: req.body.postContent,
    };
    posts.push(post);
    res.redirect("/");
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});
