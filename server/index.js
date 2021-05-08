import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";
import { Server } from "socket.io";

// mongo connection
import "./config/mongo.js";
// socket configuration
import WebSockets from "./utils/WebSockets.js";
// routes
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import locationRouter from "./routes/location.js";
// middlewares
import { decode } from './middlewares/jwt.js'

const app = express();

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3000";
app.set("port", port);
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routers
app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/locations", locationRouter);

/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesn\'t exist'
  });
});


/** Create HTTP server. */
const server = http.createServer(app);

/** Create socket connection */
const io = new Server(server);
io.on('connection', WebSockets.connection);

/** Listen on provided port, on all network interfaces. */
server.listen(port, async () => {
  try { 
    console.log("Listening in server. listen in try block");
  } catch (e) {
    console.error(e);
  }
});
/** Event listener for HTTP server "listening" event. */
server.on("listening", () => {
  console.log(`Listening on port: http://localhost:${port}/`);
});


// Original line 8 in package.json
// "start": "nodemon server/index.js",