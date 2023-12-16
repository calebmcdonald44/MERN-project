const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT;

app.use(cors())
require('./config/mongoose.config')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const server = app.listen(port, () => 
    console.log(`Listening on port: ${port}`) 
);

// other stuff
// require('./routes/author.routes')(app);
// app.listen(port, () => console.log(`Listening on port: ${port}`) );

const io = require('socket.io')(server, {cors: true})

io.on("connection", socket => {
    console.log(socket.id)
    socket.on("event_from_client", data => {
        console.log(data)
        socket.broadcast.emit("send_data_to_all_other_clients", data)
    })
})