const Comment = require("../models/Comment");
const User = require("../models/User");
const mongoose = require("mongoose");
// get io from req.app to avoid circular require and undefined io

exports.createComment = async (req, res) => {
  try {
    const { text, profileOwnerId } = req.body;
    const commentAuthorId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(profileOwnerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid profileOwnerId.",
      });
    }

    if (!text || !profileOwnerId) {
      return res.status(400).json({
        success: false,
        message: "Text and profile owner are required.",
      });
    }

    if (commentAuthorId.toString() === profileOwnerId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You cannot comment on your own profile.",
      });
    }

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
    );
    const commentsThisMonth = await Comment.countDocuments({
      commentAuthor: commentAuthorId,
      createdAt: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    });
    if (commentsThisMonth >= 3) {
      return res.status(403).json({
        success: false,
        message: "Monthly comment limit reached (3 per month).",
      });
    }

    const comment = await Comment.create({
      text,
      commentAuthor: commentAuthorId,
      profileOwner: profileOwnerId,
    });

    await User.findByIdAndUpdate(profileOwnerId, {
      $push: { comments: comment._id },
    });

    // Populate commentAuthor before emitting via socket
    await comment.populate("commentAuthor", "_id image");

    const io = req.app.get("io");
    if (io) {
      console.log(
        `[socket] Emitting comment:new for profileOwner`,
      );
      io.to(`profile:${profileOwnerId}`).emit("comment:new", comment);
    }

    res.status(201).json({
      success: true,
      comment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to create comment.",
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    if (comment.commentAuthor.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this comment.",
      });
    }

    await Comment.findByIdAndDelete(commentId);
    await User.findByIdAndUpdate(comment.profileOwner, {
      $pull: { comments: commentId },
    });

    const io = req.app.get("io");
    if (io) {
      console.log(
        `[socket] Emitting comment:delete for profileOwner ${comment.profileOwner}, commentId ${commentId}`,
      );
      io.to(`profile:${comment.profileOwner}`).emit("comment:delete", {
        commentId,
      });
    }

    res.status(200).json({
      success: true,
      message: "Comment deleted.",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to delete comment.",
    });
  }
};

exports.toggleCommentVisibility = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    if (comment.profileOwner.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized.",
      });
    }

    comment.isVisible = !comment.isVisible;
    await comment.save();


    const io = req.app.get("io");
    if (io)
      io.to(`profile:${comment.profileOwner}`).emit("comment:toggle", {
        commentId: comment._id,
        isVisible: comment.isVisible,
      });

    res.status(200).json({
      success: true,
      isVisible: comment.isVisible,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to update visibility.",
    });
  }
};

exports.getMyProfileComments = async (req, res) => {
  try {
    const userId = req.user._id;

    const comments = await Comment.find({
      profileOwner: userId,
      isVisible: true,
    })
      .populate("commentAuthor", "_id image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch comments.",
    });
  }
};

exports.getProfileComments = async (req, res) => {
  try {
    const { userId } = req.params;
    const viewerId = req.user._id;

    const isOwnProfile = userId === viewerId.toString();

    const query = {
      profileOwner: userId,
    };

    if (!isOwnProfile) {
      query.isVisible = true;
    }

    const comments = await Comment.find(query)
      .populate("commentAuthor", "_id image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      comments,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile comments.",
    });
  }
};
