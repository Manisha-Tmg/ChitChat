import express, { Router } from "express";
import chatController from "../controllers/chat.controller";
import auth from "../middleware/auth.middleware";

const chatRouter: Router = express.Router();

chatRouter.post(
  "/create-new-chat",
  auth.isAuthenticated,
  chatController.createChat,
);

export default chatRouter;
