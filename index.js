require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.Server(app);

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 5000;

const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_URL || "mongodb://localhost:27017/message-db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
);

app.use(cors())
app.use(bodyParser.json({ limit: "50mb" })); // for parsing application/json
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.json());

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
