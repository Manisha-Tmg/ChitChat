import express, { Router } from "express";
import auth from "../../middleware/auth.middleware";
import messageController from "../../controllers/message.controller";

const messageRouter: Router = express.Router();

messageRouter.post(
  "/new-message",
  auth.isAuthenticated,
  messageController.createMessage,
);

messageRouter.get(
  "/get-all-messages/:chatId",
  auth.isAuthenticated,
  messageController.getAllMessage,
);

export default messageRouter;
