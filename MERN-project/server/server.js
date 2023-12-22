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

    // runs when a player joins a room.
    socket.on("join_room", (data) => {
        socket.join(data.room)
        console.log(`User: ${socket.id} joined room: ${data.room}`);

        connections[data.room] = connections[data.room] ?? 0
        connections[data.room]++

        socket.to(data.room).emit("receive_player_data", data.userName)
        socket.emit("color_assigned", connections[data.room] == 1 ? "r" : "b")
    });

    // runs when opponents data is filled
    socket.on("emit_again", (data) => {
        socket.to(data.room).emit("receive_player_data", data.userName)
    })

    // run when a player sends a message
    socket.on("send_message", (data) => {
        console.log(data)
        console.log(`id: ${socket.id}`)
        socket.to(data.room).emit("receive_message", data)
    });

    // runs when a player makes a move
    socket.on("player_move", (data) => {
        console.log(data)
        socket.to(data.room).emit("receive_move", data)
    })

    socket.on("rematch", (data) => {
        console.log(data)

        const updatedGameData = {
            board : [
                ["-", "-", "-", "-", "-", "-", "-"],
                ["-", "-", "-", "-", "-", "-", "-"],
                ["-", "-", "-", "-", "-", "-", "-"],
                ["-", "-", "-", "-", "-", "-", "-"],
                ["-", "-", "-", "-", "-", "-", "-"],
                ["-", "-", "-", "-", "-", "-", "-"],
            ],
            room: data.room
        };


        socket.to(data.room).emit("receive_board", updatedGameData)
    })

    // runs when a player disconnects from a room
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
})

// server listens on the port given
server.listen('8000', () => {
    console.log("Server is running on port 8000...");
});
