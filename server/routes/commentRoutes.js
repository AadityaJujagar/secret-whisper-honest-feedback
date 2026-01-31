const express = require("express");
const router = express.Router();

const {
  createComment,
  deleteComment,
  toggleCommentVisibility,
  getMyProfileComments,
  getProfileComments,
} = require("../controllers/CommentHandler");
const { auth } = require("../middlewares/auth");

router.post("/comment", auth, createComment);
router.get("/me", auth, getMyProfileComments);
router.delete("/delete-comment/:commentId", auth, deleteComment);
router.patch("/toggle-comment/:commentId", auth, toggleCommentVisibility);
router.get("/profile/:userId", auth, getProfileComments);

module.exports = router;
