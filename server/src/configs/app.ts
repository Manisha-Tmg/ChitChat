import cors from "cors";
import express from "express";
import authRouter from "../routes/user.routes";

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
    this.app.use("api/users", authRouter);
  }
}
