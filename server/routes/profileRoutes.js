const express = require("express");
const router = express.Router();

const {
  getUserInfo,
  getUserProfile,
  updateProfile,
} = require("../controllers/Profile");

const { auth } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

router.get("/me", auth, getUserInfo);
router.get("/user/:userId", getUserProfile);
router.put("/update-profile", auth, upload.single("image"), updateProfile);

module.exports = router;
