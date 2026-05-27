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

  private allowOrigin = [process.env.CLIENT_URL || "", "http://localhost:3000"];

  public io = new Server(this.server, {
    cors: {
      origin: this.allowOrigin,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
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
        origin: this.allowOrigin,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

        credentials: true,
      }),
    );
    this.app.use(express.json());
  }
  private onlineUser: string[] = [];
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
      socket.on("send-msg", (message) => {
        this.io
          .to(message?.members[0])
          .to(message?.members[1])
          .emit("receive-msg", message);
      });
      socket.on("clear-unread-msg", (data) => {
        this.io
          .to(data?.members[0])
          .to(data?.members[1])
          .emit("msg-count-clear", data);
      });
      socket.on("user-typing", (data) => {
        this.io
          .to(data?.members[0])
          .to(data?.members[1])
          .emit("started-typing", data);
      });

      socket.on("user-logged", (userId) => {
        if (!this.onlineUser.includes(userId)) {
          this.onlineUser.push(userId);
        }
        socket.emit("onlne-user", this.onlineUser);
      });

      // console.log("connected with Socket ID: " + socket.id);

      socket.on("Disconnect", () => {
        console.log("DIsconnected :", socket.id);
      });
    });
  }
}
