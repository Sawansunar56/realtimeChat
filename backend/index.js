const connectToMongo = require('./db');
const Chat = require('./models/Chat');

connectToMongo();

const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server }  = require('socket.io')

// cors is added to allow connection between frontend and backend as both are int different ports which doesn't follow cors guidelines.
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

const cors = require('cors');

app.use(cors())

app.use(express.json())

app.use('/api/auth', require('./routes/auth'));
app.use('/api/chats', require('./routes/chats'));


const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Listening on *: ${PORT}`);
})

const users = {};
const chats = [];

io.on('connection', socket => {
  socket.on('new-user-joined', name=> {
    users[socket.id] = name;
    console.log("started",  name)
    // socket.broadcast.emit('user-joined', name);
  })

  socket.on('chat-send',async (chat) => {
    chats[socket.id] = chat;

    const response = await fetch('localhost:5000/api/chats/addChat', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    socket.broadcast.emit('receive', {message: chat, name: users[socket.id]});
  })

  socket.on('receive-save', async (chat) => {
    const response = await fetch('localhost:5000/api/chats/addchat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(chat)
    })
  })
})

