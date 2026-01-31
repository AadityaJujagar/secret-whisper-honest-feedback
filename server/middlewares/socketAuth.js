const JWT = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(";").forEach((c) => {
    const [k, ...v] = c.split("=");
    if (!k) return;
    cookies[k.trim()] = decodeURIComponent((v || []).join("=").trim());
  });
  return cookies;
}

exports.socketAuth = async (socket, next) => {
  try {
    console.log("[socketAuth] handshake.auth");
    console.log("[socketAuth] cookie header");
    // Try multiple places for the token: handshake.auth, Authorization header, cookies
    const authToken =
      socket.handshake?.auth?.token ||
      socket.handshake?.headers?.authorization ||
      null;

    let token = null;

    if (authToken && typeof authToken === "string") {
      if (authToken.startsWith("Bearer "))
        token = authToken.replace("Bearer ", "");
      else token = authToken;
    }

    // fallback to cookie named 'token'
    if (!token) {
      const cookies = parseCookies(socket.handshake?.headers?.cookie || "");
      token = cookies.token || null;
    }

    if (!token) {
      return next(new Error("Access denied, token required."));
    }

    const decoded = JWT.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return next(new Error("User not found."));
    }

    socket.user = user;
    next();
  } catch (err) {
    console.log("Auth error:", err.message || err);
    return next(new Error("Invalid or expired token"));
  }
};
