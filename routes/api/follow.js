const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/User");

// @route           PUT api/follow/user/:id
// @description     Follow another User
// @access          Private
router.put("/user/:id", [auth], async (req, res) => {
  try {
    const followee = await User.findById(req.params.id);
    const follower = await User.findById(req.user.id);

    if (
      followee.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length > 0 &&
      follower.followees.filter(
        (followee) => followee.user.toString() === req.params.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: "You already follow" });
    }

    follower.followees.unshift({ user: req.params.id });
    followee.followers.unshift({ user: req.user.id });

    await follower.save();
    await followee.save();

    res.json(follower);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           PUT api/follow/unfollow/:id
// @description     Unfollow another User
// @access          Private
router.put("/unfollow/:id", [auth], async (req, res) => {
  try {
    const followee = await User.findById(req.params.id);
    const follower = await User.findById(req.user.id);

    if (
      followee.followers.filter(
        (follower) => follower.user.toString() === req.user.id
      ).length === 0 &&
      follower.followees.filter(
        (followee) => followee.user.toString() === req.params.id
      ).length === 0
    ) {
      return res.status(400).json({ msg: "User has not yet been followed" });
    }

    const removeIndex = followee.followers
      .map((follower) => follower.user.toString())
      .indexOf(req.user.id);

    const removeIndex2 = follower.followees
      .map((followee) => followee.user.toString())
      .indexOf(req.params.user);

    followee.followers.splice(removeIndex);
    follower.followees.splice(removeIndex2);

    await followee.save();
    await follower.save();

    res.json(follower);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
