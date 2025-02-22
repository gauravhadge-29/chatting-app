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
        username: "Ameyvyas",
        content: "Nvidia CEO Jensen Huang addressed investor concerns after a $600 billion market value drop, clarifying that the market misunderstood the implications of DeepSeek's new AI model Huang emphasized the ongoing need for powerful computing in AI development"
    },
    {
        id: uuidv4(),
        username: "Aayushi",
        content: "Mid-Career Opportunities: Machine learning has opened up new career opportunities for mid-career professionals. With businesses across industries adopting automation and leveraging data, roles such as ML engineers, data scientists, and AI research scientists are in high demand"
    },
    {
        id: uuidv4(),
        username: "Aayush",
        content: "KAIROSOFT AI Solutions Limited is set to launch a rights issue to fuel growth amidst rising demand for AI solutions. This reflects the robust demand from investors and the growing strength of the Indian AI sector."
    },
    {
        id: uuidv4(),
        username: "Gauvrav",
        content: "RBI's Deep Check: The Reserve Bank of India (RBI) is leveraging AI and machine learning tools to predict future outcomes, spot abnormal activities, and manage risks in the financial landscape. These models are being used for 'stress testing' banks to ensure they have enough capital to absorb economic shocks."
    },
    {
        id: uuidv4(),
        username: "Uday",
        content: "Meta Layoffs and Hiring: Meta is set to conduct global layoffs starting February 10, 2025. However, the company is also expediting the hiring of machine learning engineers to align with its strategic priorities for 2025!"
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
    res.redirect("/");
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
    res.redirect("/");
});

// Start the Server
app.listen(port , () => {
    console.log(`Listening on port ${port}`);
}); 