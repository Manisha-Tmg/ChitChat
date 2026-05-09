import express, { Router } from "express";
import AuthController from "../controllers/auth.controller";

const authRouter: Router = express.Router();

authRouter.post("register", AuthController.registerUser);

export default authRouter;
