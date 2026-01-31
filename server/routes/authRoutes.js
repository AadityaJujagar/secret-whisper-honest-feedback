const express = require("express");
const router = express.Router();

const { login, signup, logout } = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", auth, logout);

module.exports = router;
