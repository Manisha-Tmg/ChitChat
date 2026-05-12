import { Request, Response } from "express";
import { createChatServices } from "../services/chat.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";

class chatController {
  static async createChat(req: Request, res: Response) {
    try {
      const data = req.body;
      const chat = await createChatServices(data);

      return sendSuccessResponse(res, "Chat created sucessfully", chat, 201);
    } catch (err: any) {
      return sendErrorResponse(res, err.message, 400);
    }
  }
}

export default chatController;
