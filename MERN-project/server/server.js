const express = require('express');
const app = express();
const socket = require('socket.io')
const http = require("http");
const cors = require('cors')
const { Server } = require('socket.io')

require('dotenv').config();
require('./config/mongoose.config')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    }
})

const connections = {};

io.on("connection", socket => {
    console.log(socket.id);

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User: ${socket.id} joined room: ${data}`);

        connections[data] = connections[data] ?? 0
        connections[data]++

        socket.emit("color_assigned", connections[data] == 1 ? "r" : "b")
    });

    socket.on("send_message", (data) => {
        console.log(data)
        console.log(`id: ${socket.id}`)
        socket.to(data.room).emit("receive_message", data)
    });

    socket.on("player_move", (data) => {
        console.log(data)
        socket.to(data.room).emit("receive_move", data)
    })

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
})

server.listen('8000', () => {
    console.log("Server is running on port 8000...");
});
