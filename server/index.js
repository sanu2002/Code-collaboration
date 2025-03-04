const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;

const usersocketmap = {}; // Map of users and socket IDs

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../realtime-testeditor/public/index.html"));
});

// Function to get all clients in a room
const getAllClients = (roomid) => {
  return Array.from(io.sockets.adapter.rooms.get(roomid) || []).map((socketid) => ({
    socketid,
    username: usersocketmap[socketid] || "Guest",
  }));
};
const roomCodeMap = {}; // Stores latest code for each room

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle user joining a room
  socket.on("join", ({ username, roomid }) => {
    console.log(`User: ${username}, Room: ${roomid}`);

    socket.join(roomid);
    usersocketmap[socket.id] = username;

    const clients = getAllClients(roomid);
    console.log("Clients in Room:", clients);

    clients.forEach(({ socketid }) => {
      io.to(socketid).emit("joined", {
        clients,
        username,
        socketid: socket.id,
      });
    });
  });

  // Broadcast code changes to all users in a room except the sender


  socket.on('code',({code,roomid})=>{
    // console.log(`Code change received from ${code} in room ${roomid}`);
    
    io.in(roomid).emit('code', {code}); 

  })

  socket.on('sync-code',({code,socketid})=>{
    io.to(socketid).emit('sync-code', code);  
    console.log('Syncing code--------------',code);
    // console.log('socekt id----------------',socketid);

  })  




  

  // Handle user disconnecting
  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];

    rooms.forEach((roomid) => {
      socket.to(roomid).emit("disconnected", {
        socketid: socket.id,
        username: usersocketmap[socket.id],
      });
    });

    delete usersocketmap[socket.id];
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
