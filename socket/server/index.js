const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods:["GET","POST"]
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log(`${socket.id} a user connected`);
  socket.on("hi", (e) => {
    io.emit("asik",e)
  })
});

server.listen(8800, () => {
  console.log("listening on *:8800");
});
