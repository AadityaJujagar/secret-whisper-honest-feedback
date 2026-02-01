const http = require("http");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { Server } = require("socket.io");

const dbConnect = require("./configs/db");
const authRoutes = require("./routes/authRoutes");
const commentRoutes = require("./routes/commentRoutes");
const profileRoutes = require("./routes/profileRoutes");
const { socketAuth } = require("./middlewares/socketAuth");
const socketHandler = require("./socket");

require("dotenv").config();

const PORT = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);

// robust CORS handling: allow explicit CLIENT_URL(s) or fallback to permissive for no-origin requests
const clientEnv = process.env.CLIENT_URL || "";
const allowedOrigins = clientEnv
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like curl/postman/server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0) {
        // no CLIENT_URL configured on environment: allow the request but log a warning
        console.warn(
          "Warning: CLIENT_URL not set — allowing CORS for origin:",
          origin,
        );
        return callback(null, true);
      }
      if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
      return callback(new Error("CORS policy: Origin not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);

app.use(express.json());
app.use(cookieParser());

dbConnect();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/profiles", profileRoutes);

const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) return callback(null, true);
      return callback(new Error("Socket CORS policy: Origin not allowed"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  },
});

app.set("io", io);
io.use(socketAuth);
socketHandler(io);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is running...",
    uptime: process.uptime(),
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
