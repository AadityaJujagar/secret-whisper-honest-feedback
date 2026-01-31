module.exports = (io) => {
  io.on("connection", (socket) => {
    if (!socket.user) {
      socket.disconnect();
      return;
    }

    const userId = socket.user._id.toString();

    // personal room (for direct events)
    socket.join(`user:${userId}`);
    console.log(`User connected`);

    // join profile room
    socket.on("profile:join", (profileOwnerId) => {
      socket.join(`profile:${profileOwnerId}`);
      console.log(`User joined a profile`);
    });

    // leave profile room
    socket.on("profile:leave", (profileOwnerId) => {
      socket.leave(`profile:${profileOwnerId}`);
      console.log(`User left a profile`);
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected`);
    });
  });
};
