import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";

import authRouter from "../routes/auth.routes";
import router from "../routes/protectedRoutes/users.routes";
import chatRouter from "../routes/protectedRoutes/chat.routes";
import messageRouter from "../routes/protectedRoutes/message.routes";

export class App {
  public app = express();
  public server = http.createServer(this.app);

  public io = new Server(this.server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  constructor() {
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeSocket();
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
      }),
    );
    this.app.use(express.json());
  }

  private initializeRoutes() {
    this.app.use("/api/users", authRouter);
    this.app.use("/api/users/protected", router);
    this.app.use("/api/chats", chatRouter);
    this.app.use("/api/messages", messageRouter);
  }

  // Test socket connection from client
  private initializeSocket() {
    this.io.on("connection", (socket) => {
      socket.on("join-room", (userId) => {
        socket.join(userId);
      });
      // console.log("connected with Socket ID: " + socket.id);

      socket.on("Disconnect", () => {
        console.log("DIsconnected :", socket.id);
      });
    });
  }
}
