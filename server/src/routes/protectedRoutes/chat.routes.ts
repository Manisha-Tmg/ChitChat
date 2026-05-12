import express, { Router } from "express";
import chatController from "../../controllers/chat.controller";
import auth from "../../middleware/auth.middleware";

const chatRouter: Router = express.Router();

chatRouter.post(
  "/create-new-chat",
  auth.isAuthenticated,
  chatController.createChat,
);
chatRouter.get(
  "/get-all-chats",
  auth.isAuthenticated,
  chatController.getAllChats,
);

export default chatRouter;
