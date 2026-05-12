import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";
import { createMessageServices } from "../services/message.service";

class messageController {
  static async createMessage(req: Request, res: Response) {
    try {
      const { chatId, text, sender } = req.body;
      const messages = await createMessageServices(chatId, text, sender);
      return sendSuccessResponse(
        res,
        "Message created successfully",
        messages,
        201,
      );
    } catch (error: any) {
      return sendErrorResponse(res, error.message, 400);
    }
  }
}

export default messageController;
