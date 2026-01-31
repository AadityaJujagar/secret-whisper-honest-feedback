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

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
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
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);
io.use(socketAuth);
socketHandler(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
