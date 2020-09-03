const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Post = require("../../models/Post");
const User = require("../../models/User");

// @route           POST api/posts
// @description     Create a new post
// @access          Private
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required").not().isEmpty(),
      check("title", "Title is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        title: req.body.title,
        image: req.body.image,
        tools: req.body.tools,
        materials: req.body.materials,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route           GET api/posts
// @description     Get all posts
// @access          Private
router.get("/", [auth], async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           GET api/posts/:id
// @description     Get post by id
// @access          Private
router.get("/:id", [auth], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           DELETE api/posts/:id
// @description     Delete post
// @access          Private
router.delete("/:id", [auth], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route           PUT api/posts/like/:id
// @description     Like a post
// @access          Private
router.put("/like/:id", [auth], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post is already liked by current user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "You already liked this post" });
    }

    post.likes.unshift({
      user: req.user.id,
    });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           PUT api/posts/unlike/:id
// @description     Unlike a post
// @access          Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post has already been liked by user
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           POST api/posts/comment/:id
// @description     Comment on a post
// @access          Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id);
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route           DELETE api/posts/comment/:id
// @description     Delete a comment
// @access          Private
router.delete("/comment/:id/:comment_id", [auth], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // Check User
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           Put api/posts/:id/instructions
// @description     Add instructions to Post
// @access          Private
router.put(
  "/:id/instructions",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("directions", "Directions is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, directions, image } = req.body;

    const newInst = {
      title,
      directions,
      image,
    };

    try {
      const post = await Post.findById(req.params.id);

      post.instructions.push(newInst);

      await post.save();

      res.json(post.instructions);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route           Delete api/posts/instructions/:id
// @description     Delete Instructions
// @access          Private
router.delete("/:id/instructions/:inst_id", [auth], async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const inst = post.instructions.find(
      (instruction) => instruction.id === req.params.inst_id
    );

    if (!inst) {
      return res.status(404).json({ msg: "Instruction not found" });
    }

    // Get remove index
    const removeIndex = post.instructions.indexOf(inst._id);

    post.instructions.splice(removeIndex, 1);

    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
