const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Follow = require("../../models/Follow");
const { db } = require("../../models/User");

// @route           POST api/follow
// @description     Follow another User
// @access          Private
router.post("/user/:id", [auth], async (req, res) => {
  try {
    const follower = await User.findById(req.user.id).select("-password");
    const followee = await User.findById(req.params.id).select("-password");

    let follow = new Follow({
      follower: follower,
      followee: followee,
    });

    if (follow) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Already following User" }] });
    }

    follow.save();

    res.json(follow);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           GET api/follow/followers
// @description     Get all followers
// @access          Private
router.get("/followers", [auth], async (req, res) => {
  const user = await Follow.find({ followee: req.user.id });

  res.json(user);
});

// @route           GET api/follow/followees
// @description     Get all followers
// @access          Private
router.get("/followees", [auth], async (req, res) => {
  const user = await Follow.find({ follower: req.user.id });

  res.json(user);
});

module.exports = router;
