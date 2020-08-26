const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Follow = require("../../models/Follow");

// @route           POST api/follow
// @description     Follow another User
// @access          Private
router.post("/user/:id", [auth], async (req, res) => {
  try {
    const follower = req.user.id;
    const followee = req.params.id;

    const last = await Follow.findOne({
      follower: follower,
      followee: followee,
    });

    if (last) {
      return res.send("Already following User");
    }

    const follow = new Follow({
      follower: follower,
      followee: followee,
    });

    follow.save();

    return res.send(follow);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           DELETE api/follow/:id
// @description     Unfollow a User
// @access          Private
router.delete("/unfollow/:id", [auth], async (req, res) => {
  try {
    const follower = req.user.id;
    const followee = req.params.id;

    const follow = await Follow.findOneAndRemove({
      follower: follower,
      followee: followee,
    });

    res.send(follow);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           GET api/follow/followers
// @description     Get all followers
// @access          Private
router.get("/followers", [auth], async (req, res) => {
  try {
    const follow = await Follow.find({ followee: req.user.id });

    const followers = await follow.map((value) => {
      return value.follower;
    });

    res.json(followers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           GET api/follow/followees
// @description     Get all followers
// @access          Private
router.get("/followees", [auth], async (req, res) => {
  try {
    const follow = await Follow.find({ follower: req.user.id });

    const followees = await follow.map((value) => {
      return value.followee;
    });

    res.json(followees);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/follow", [auth], async (req, res) => {
  try {
    const id = req.user.id;

    const user = await User.findOne({ _id: id });

    user.populate([{ path: "following" }, { path: "followers" }]);

    return res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
