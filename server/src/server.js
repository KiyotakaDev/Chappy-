import app from "./app.js";
import { createServer } from "http";
import { Server as SocketServer } from "socket.io";

const server = createServer(app);
const io = new SocketServer(server, {
  origin: "http://localhost:4000/",
});

import { chatSocket } from "./sockets/chatSocket.js";
chatSocket(io);

export default server;
