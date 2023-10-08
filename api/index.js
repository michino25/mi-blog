const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
// const multer = require("multer");
const fs = require("fs");

const dotevn = require("dotenv");
dotevn.config();

// const uploadMiddleware = multer({ dest: "uploads/" });

const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");

const app = express();

// khi dùng credential phải thêm vài thông tin vào cors
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
    })
);
// app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(process.env.MONGODB_URL);

const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345werjktjwertkj";

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch (e) {
        res.status(400).json(e);
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.findOne({ username });
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if (passOk) {
        // logged in
        jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
            if (err) throw err;
            res.json({
                id: userDoc._id,
                username,
                token,
            });
        });
    } else {
        res.status(400).json("wrong credentials");
    }
});

// check token valid
app.post("/profile", (req, res) => {
    const { token } = req.body;

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    });
});

// file handle
app.post("/post", async (req, res) => {
    // rename file extension
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;

        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary,
            content,
            cover: newPath,
            author: info.id,
        });

        res.json(postDoc);
    });
});

app.get("/post", async (req, res) => {
    res.json(
        await Post.find()
            .populate("author", ["username"])
            .sort({ createdAt: -1 })
            .limit(20)
    );
});

app.get("/post/:id", async (req, res) => {
    const { id } = req.params;
    const postDoc = await Post.findById(id).populate("author", ["username"]);
    res.json(postDoc);
});

// file handle
app.put("/post", async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        newPath = path + "." + ext;
        fs.renameSync(path, newPath);
    }

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;

        const { id, title, summary, content } = req.body;
        const postDoc = await Post.findById(id);

        const isAuthor =
            JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json("you are not the author");
        }

        // const updatedPost = await Post.findByIdAndUpdate(id, {
        //     title,
        //     summary,
        //     content,
        //     cover: newPath ? newPath : postDoc.cover,
        // });

        postDoc.title = title;
        postDoc.summary = summary;
        postDoc.content = content;
        postDoc.cover = newPath ? newPath : postDoc.cover;

        await postDoc.save(); // Save the changes

        res.json(postDoc);
    });
});

app.get("/test", (req, res) => {
    res.json("test ok");
});

// Define a route handler to handle requests for /favicon.ico
app.get("/favicon.ico", (req, res) => {
    res.status(204).end(); // Send a 204 No Content response
});

app.listen(process.env.API_PORT);
