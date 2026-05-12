import { Request, Response } from "express";
import {
  createChatServices,
  getAllChatServices,
} from "../services/chat.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";
import { AuthRequest } from "../middleware/auth.middleware";

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
  static async getAllChats(req: AuthRequest, res: Response) {
    try {
      const id = req.user.id as string;

      const chat = await getAllChatServices(id);

      return sendSuccessResponse(res, "Chat fetched sucessfully", chat, 201);
    } catch (err: any) {
      return sendErrorResponse(res, err.message, 400);
    }
  }
}

export default chatController;
