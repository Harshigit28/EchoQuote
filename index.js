const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Sample Data
let posts = [
    { id: uuidv4(), username: "Riya", content: "Where there’s a will, there’s a way." },
    { id: uuidv4(), username: "Rohan", content: "Lift up someone else. - Booker T. Washington" },
    { id: uuidv4(), username: "Saanvi", content: "Do what you feel is right. - Eleanor Roosevelt" },
    { id: uuidv4(), username: "Aarav", content: "Success is not final. - Winston Churchill" }
];

// Redirect root to /posts to avoid 404 errors
app.get("/", (req, res) => {
    res.redirect("/posts");
});

// Read - Show all posts
app.get("/posts", (req, res) => {
    res.render("index", { posts });
});

// Create - Form for new post
app.get("/posts/new", (req, res) => {
    res.render("new");
});

// Create - Add new post
app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    posts.push({ id: uuidv4(), username, content });
    res.redirect("/posts");
});

// Read - Show single post
app.get("/posts/:id", (req, res) => {
    let post = posts.find(p => p.id === req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.render("show", { post });
});

// Update - Show edit form
app.get("/posts/:id/edit", (req, res) => {
    let post = posts.find(p => p.id === req.params.id);
    if (!post) return res.status(404).send("Post not found");
    res.render("edit", { post });
});

// Update - Modify post
app.patch("/posts/:id", (req, res) => {
    let post = posts.find(p => p.id === req.params.id);
    if (post) post.content = req.body.content;
    res.redirect("/posts");
});

// Delete - Remove post
app.delete("/posts/:id", (req, res) => {
    posts = posts.filter(p => p.id !== req.params.id);
    res.redirect("/posts");
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
