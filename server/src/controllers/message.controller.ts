import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";
import {
  createMessageServices,
  getAllMessageServices,
} from "../services/message.service";

class messageController {
  static async createMessage(req: Request, res: Response) {
    try {
      const { chatId, text, sender, image } = req.body;
      const messages = await createMessageServices(chatId, text, sender, image);
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

  static async getAllMessage(req: Request, res: Response) {
    try {
      const chatId = req.params.chatId;
      const messages = await getAllMessageServices(chatId as string);
      return sendSuccessResponse(
        res,
        "Message fetched successfully",
        messages,
        200,
      );
    } catch (error: any) {
      return sendErrorResponse(res, error.message, 400);
    }
  }
}

export default messageController;
