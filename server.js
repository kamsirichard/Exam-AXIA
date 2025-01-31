const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());


let users = [];
let posts = [];
let userIdCounter = 1;
let postIdCounter = 1;


app.get("/", (req, res) => {
    res.send("Welcome to the User Account API! Use /api/users to interact with the API.");
});

// Create a user
app.post("/api/users", (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newUser = { id: userIdCounter++, name, email, password };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Get a single user
app.get("/api/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
});
// Get all users (To test the api)
app.get("/api/users", (req, res) => {
    res.json(users); // Returns the entire users array
});

// Update a user
app.put("/api/users/:id", (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "User not found" });

    const { name, email, password } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    res.json(user);
});

// Delete a user
app.delete("/api/users/:id", (req, res) => {
    const index = users.findIndex((u) => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "User not found" });

    users.splice(index, 1);
    res.json({ message: "User deleted successfully" });
});

//Exam 02



// Create a post
app.post("/api/posts", (req, res) => {
    const { userId, title, content } = req.body;
    if (!userId || !title || !content) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const newPost = { id: postIdCounter++, userId, title, content };
    posts.push(newPost);
    res.status(201).json(newPost);
});

// Get all posts
app.get("/api/posts", (req, res) => {
    res.json(posts);
});

// Get a single post
app.get("/api/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
});

// Update a post
app.put("/api/posts/:id", (req, res) => {
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: "Post not found" });

    const { title, content } = req.body;
    if (title) post.title = title;
    if (content) post.content = content;

    res.json(post);
});

// Delete a post
app.delete("/api/posts/:id", (req, res) => {
    const index = posts.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ message: "Post not found" });

    posts.splice(index, 1);
    res.json({ message: "Post deleted successfully" });
});


const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
