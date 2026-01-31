const User = require("../models/User");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please enter all credentials.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match.",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      image: `https://api.dicebear.com/9.x/initials/svg?seed=${name}`,
    });
    const savedUser = await user.save();

    const { password: _, ...userData } = savedUser._doc;
    res.status(201).json({
      success: true,
      userData,
      message: "User is registered successfully.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "User registration failed, try again.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please enter all credentials.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist, please register first.",
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const token = JWT.sign(
        {
          id: user._id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "48h",
        },
      );

      const userObj = user.toObject();
      userObj.token = token;
      userObj.password = undefined;

      const cookieOptions = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 3 days
        httpOnly: true,
        // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        // secure: process.env.NODE_ENV === "production",
      };

      res.cookie("token", token, cookieOptions).status(200).json({
        success: true,
        token,
        user: userObj,
        message: "User logged in successfully.",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid password.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Login failed, try again.",
    });
  }
};

exports.logout = async (_req, res) => {
  try {
    const cookieOptions = {
      httpOnly: true,
      expires: new Date(0),
      // sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      // secure: process.env.NODE_ENV === "production",
    };

    res.cookie("token", "", cookieOptions).status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};
