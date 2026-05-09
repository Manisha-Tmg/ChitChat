import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";
import { registerUserServices } from "../services/auth.service";

class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { firtstName, lastName, email, password, profileImage } = req.body;
      const user = await registerUserServices(
        firtstName,
        lastName,
        email,
        password,
        profileImage,
      );
      return sendSuccessResponse(res, "User creatied sucessfully", user, 200);
    } catch (err: any) {
      return sendErrorResponse(res, "Error creating the account", 400);
    }
  }
}

export default AuthController;
