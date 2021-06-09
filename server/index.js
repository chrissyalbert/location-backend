import http from "http";
import express from "express";
import logger from "morgan";
import cors from "cors";
import { Server } from "socket.io";

// mongo connection
import "./config/mongo.js";

// routes
import indexRouter from "./routes/index.js";
import userRouter from "./routes/user.js";
import locationRouter from "./routes/location.js";

/** Get port from environment and store in Express. */
const port = process.env.PORT || "3001";
let client;

function onNewWebsocketConnection(socket) {
  console.info(`Socket ${socket.id} has connected.`);
  client = socket;
  socket.on("disconnect", () => {
      console.info(`Socket ${socket.id} has disconnected.`);
  });
}

function startServer() {
  // create a new express app
  const app = express();
  // create http server and wrap the express app
  const server = http.createServer(app);
  // bind socket.io to that server
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

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

  // will fire for every new websocket connection
  io.on("connection", onNewWebsocketConnection);

  // important! must listen from `server`, not `app`, otherwise socket.io won't function correctly
  server.listen(port, async () => {
    try { 
      console.log(`Listening in server on port ${port}. Listening in try block`);
    } catch (e) {
      console.error(e);
    }
  });
}

startServer();
export default client;
// Original line 8 in package.json
// "start": "nodemon server/index.js",