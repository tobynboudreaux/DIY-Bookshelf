const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  occupation: {
    type: String,
  },
  website: {
    type: String,
  },
  skills: {
    type: [String],
    required: true,
  },
  location: {
    type: String,
  },
  status: {
    type: String,
  },
  bio: {
    type: String,
  },
  boards: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      saved_posts: [
        {
          section: {
            type: String,
          },
          note: {
            type: String,
          },
          post: {
            type: Schema.Types.ObjectId,
            ref: "post",
          },
        },
      ],
    },
  ],
  social: {
    youtube: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
