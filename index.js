require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser");
const http = require('http');
const socket = require('socket.io');

const uploadRoute = require('./src/router/upload')
const imageRoute = require('./src/router/image')
const userRoute = require('./src/router/user')
const conversationRoute = require('./src/router/conversation')
const searchRoute = require('./src/router/search')
const tokenRoute = require('./src/router/token')
const friendRoute = require('./src/router/friend')

const app = express();
const server = http.Server(app);

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const host = process.env.HOST;
const port = process.env.PORT;

const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_URL,
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

app.use('/', tokenRoute)
app.use('/upload', uploadRoute)
app.use('/image', imageRoute)
app.use('/user', userRoute)
app.use('/conversation', conversationRoute)
app.use('/search', searchRoute)
app.use('/token', tokenRoute)
app.use('/friend', friendRoute)

server.listen(port, () => {
  console.log(`Server running at ${host}:${port}`);
});
