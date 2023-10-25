const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Category = require("../models/Category");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author.toString() === req.body.author) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPVOTE POST
router.put("/vote/:id", async (req, res) => {
  try {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.author === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author")
      .populate("category");
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//SEARCH & GET ALL POSTS
router.get("/", async (req, res) => {
  const userName = req.query.user;
  const catName = req.query.category;
  const postName = req.query.search;

  try {
    let posts = [];
    if (userName) {
      const user = await User.findOne({ username: userName });
      if (user) {
        posts = await Post.find({ author: user._id })
          .populate("author")
          .populate("category");
      }
    }
    if (catName) {
      const category = await Category.findOne({ code: catName });
      posts = await Post.find({ category: category._id })
        .populate("author")
        .populate("category");
    }

    if (postName) {
      posts = await Post.find({
        title: { $regex: postName, $options: "i" },
      })
        .populate("author")
        .populate("category");
    }

    if (!(userName || catName || postName)) {
      posts = await Post.find()
        .sort({ createdAt: -1 })
        .limit(20)
        .populate("author")
        .populate("category");
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
