import express, { Router } from "express";
import AuthController from "../controllers/auth.controller";
import auth from "../middleware/auth.middleware";

const authRouter: Router = express.Router();

authRouter.post("/register", AuthController.registerUser);
authRouter.post("/login", AuthController.loginUser);
authRouter.get("/", AuthController.readAllUser);
authRouter.get("/:id", AuthController.readUserBYId);

export default authRouter;
