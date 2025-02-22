const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
const dotenv = require("dotenv").config()

// Initialize Express App
const app = express();
const port = process.env.PORT;

// Middleware for parsing request bodies and Overiding function
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Set View Engine and Static Files
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.static(path.join(__dirname , "public")));

// Array to replicate data because we havn't learn DB yet.
let posts = [
    {
        id: uuidv4(),
        username: "Dhoni",
        content: "I Love Coding!"
    },
    {
        id: uuidv4(),
        username: "Sammy",
        content: "I Love solving Maths problem!"
    },
    {
        id: uuidv4(),
        username: "Kholi",
        content: "I got selected for my first Internship!"
    }
];

// Routes
// 1. Show all posts
app.get("/" , (req , res) => {
    res.render("index.ejs" , { posts });
});

// 2. Show form to create a new post
app.get("/posts/new" , (req , res) => {
    res.render("new.ejs");
});

// 3. Create a new post
app.post("/posts" , (req , res) => {
    let {username , content} = req.body;
    let id = uuidv4();
    posts.push({id , username , content});
    res.redirect("/posts");
});

// 4. Show a single post
app.get("/posts/:id" , (req , res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    if(!post) {
        return res.status(404).send("Post not Found!!");
    }
    res.render("show.ejs" , {post});
});

// 5. Update a post
app.patch("/posts/:id" , (req , res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).send("Post not found!");
    }
    post.content = newContent;
    res.redirect("/posts");
});

// 6. Show the edit form
app.get("/posts/:id/edit" , (req , res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    if (!post) {
        return res.status(404).send("Post not found!");
    }
    res.render("edit.ejs" , {post});
});

// 7. Delete a post
app.delete("/posts/:id" , (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("/posts");
});

// Start the Server
app.listen(port , () => {
    console.log(`Listening on port ${port}`);
}); 