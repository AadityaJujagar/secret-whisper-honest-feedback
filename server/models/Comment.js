const mongoose = require("mongoose");

const userComments = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      maxLength: 500,
    },
    commentAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profileOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Comment", userComments);
