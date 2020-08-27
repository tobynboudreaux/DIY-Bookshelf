const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");
const { remove } = require("../../models/User");

// @route           GET api/profile/me
// @description     Get current user's profile
// @access          Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           POST api/profile
// @description     Create or update a user's profile
// @access          Private
router.post(
  "/",
  [auth, [check("skills", "Skills are required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors });
    }

    const {
      occupation,
      website,
      location,
      bio,
      status,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (occupation) profileFields.occupation = occupation;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route           GET api/profile
// @description     Get all profiles
// @access          Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           GET api/profile/user/:user_id
// @description     Get profile by user id
// @access          Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route           DELETE api/profile/
// @description     Delete profile, user, and post
// @access          Private
router.delete("/", [auth], async (req, res) => {
  try {
    // Remove Posts
    await Post.deleteMany({ user: req.user.id });
    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findByIdAndRemove({ _id: req.user.id });

    res.json({ msg: "User removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           PUT api/profile/boards
// @description     Add boards to profile
// @access          Private
router.put(
  "/boards",
  [auth, [check("title", "Title is required")]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;

    const newBoard = {
      title,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.boards.unshift(newBoard);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route           DELETE api/profile/boards/:board_id
// @description     Delete board from profile
// @access          Private
router.delete("/boards/:board_id", [auth], async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.boards
      .map((item) => item.id)
      .indexOf(req.params.board_id);

    profile.boards.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           PUT api/profile/boards/:board_id/:post_id
// @description     Add post to board
// @access          Private
router.put("/boards/:board_id/:post_id", [auth], async (req, res) => {
  const { section, note } = req.body;

  const newSavedPost = {
    section,
    note,
  };

  newSavedPost.post = req.params.post_id;

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const board = profile.boards.find(
      (board) => board.id.toString() === req.params.board_id.toString()
    );

    if (
      board.saved_posts.filter(
        (post) => post.post.toString() === req.params.post_id
      ).length > 0
    ) {
      return res.status(400).json({ msg: "Post already added to board" });
    }

    const removeIndex = profile.boards
      .map((item) => item.id)
      .indexOf(req.params.board_id);

    await profile.boards.splice(removeIndex, 1);

    await board.saved_posts.unshift(newSavedPost);

    await profile.boards.unshift(board);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route           DELETE api/profile/boards/remove/:board_id/:post_id
// @description     Remove post from board
// @access          Private
router.delete("/boards/:board_id/:post_id", [auth], async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    const board = profile.boards.find(
      (board) => board.id.toString() === req.params.board_id.toString()
    );

    const removeIndex = board.saved_posts
      .map((item) => item.id)
      .indexOf(req.params.post_id);

    board.saved_posts.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
