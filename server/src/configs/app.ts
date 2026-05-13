import cors from "cors";
import express from "express";
import authRouter from "../routes/auth.routes";
import router from "../routes/protectedRoutes/users.routes";
import chatRouter from "../routes/protectedRoutes/chat.routes";
import messageRouter from "../routes/protectedRoutes/message.routes";

export class App {
  public app = express();

  constructor() {
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: "http://localhost:5173",
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
}
