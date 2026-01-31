const JWT = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Access denied. Token unavailable.",
      });
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found.",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("Auth error:", err);
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token.",
    });
  }
};
