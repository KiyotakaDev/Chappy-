export const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected");

    socket.emit('ping', 'ping')
    socket.on('pong', (data) => {
      console.log(data);
    })

    io.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};
