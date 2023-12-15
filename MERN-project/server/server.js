const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
const port = process.env.PORT;

const server = app.listen(port, () => console.log(`Listening on port: ${port}`) );
const io = require('socket.io')(server, {cors: true})


// other stuff
require('./config/mongoose.config')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// require('./routes/author.routes')(app);
app.listen(port, () => console.log(`Listening on port: ${port}`) );

io.on("connection", socket => {
    console.log(socket.id)
    socket.on("event_from_client", data => {
        console.log(data)
        socket.broadcast.emit("send_data_to_all_other_clients", data)
    })
})