import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import {
  getAllUserServices,
  loginUserServices,
  readUserBYIdServices,
  registerUserServices,
  userProfileServices,
} from "../services/auth.service";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/responseHelper";

class AuthController {
  static async registerUser(req: Request, res: Response) {
    try {
      const { firstName, lastName, email, password, profileImage } = req.body;
      const user = await registerUserServices(
        firstName,
        lastName,
        email,
        password,
        profileImage,
      );
      return sendSuccessResponse(res, "User created sucessfully", user, 200);
    } catch (err: any) {
      return sendErrorResponse(res, "Error creating the account", 400);
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await loginUserServices(email, password);
      return sendSuccessResponse(res, "Login sucessfull", user, 200);
    } catch (err: any) {
      if (
        err.message === "USER_NOT_FOUND" ||
        err.message === "CREDENTIALS DIDN'T MATCH"
      ) {
        return sendErrorResponse(res, "Incorrect Credentials", 400);
      }
      return sendErrorResponse(res, err.message, 400);
    }
  }

  static async getAllUser(req: AuthRequest, res: Response) {
    try {
      const id = req.user._id as string;

      const users = await getAllUserServices(id);
      return sendSuccessResponse(res, "User data fetched", users, 200);
    } catch (err: any) {
      return sendErrorResponse(res, err.message, 400);
    }
  }

  static async readUserBYId(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await readUserBYIdServices(id as string);
      return sendSuccessResponse(res, "User data fetched", user, 200);
    } catch (err: any) {
      return sendErrorResponse(res, "Error creating the account", 400);
    }
  }

  static async userProfile(req: AuthRequest, res: Response) {
    try {
      const id = req.user.id;
      const user = await userProfileServices(id);
      return sendSuccessResponse(res, "User profile fetched", user, 200);
    } catch (err: any) {
      return sendErrorResponse(res, "Error to fetch the data", 400);
    }
  }
}

export default AuthController;
