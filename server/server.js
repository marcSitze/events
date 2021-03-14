const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index');
const events = require('./routes/events');
const connectionDB = require('./config/db.js');
const app = express();

connectionDB();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', routes);
app.use('/events', events);

const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
      origin: '*',
      methods: ["GET", "POST", "PUT"]
    }
});

io.on('connection', socket => {
    console.log("New User Connected...");

    socket.on('participate', event => {
        io.emit("participate", event);
    });

    socket.on("newEvent", event => {
        io.emit("newEvent", event);
    });

    socket.on("getEvents", events => {
        io.emit("getEvents", events);
    });

    socket.on('deleteEvent', events => {
        io.emit("deleteEvent", events)
    });

    socket.on('disconnect', () => {
        console.log("User disconnected...");
    });

});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
