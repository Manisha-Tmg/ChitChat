import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModels from "../database/models/user.models";

export interface AuthRequest extends Request {
  user?: any;
}

class Auth {
  async isAuthenticated(
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token || token === undefined) {
      res.status(403).json({
        message: "token not found",
      });
      return;
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      async (err, decoded: any) => {
        if (err) {
          res.status(403).json({
            message: "token not valid",
          });
          return;
        } else {
          try {
            const userData = await userModels.findById(decoded.id);
            if (!userData) {
              res.status(404).json({
                message: "user not found",
              });
              return;
            }
            req.user = userData;
            next();
          } catch (error) {
            res.status(500).json({
              message: "something went wrong",
            });
          }
        }
      },
    );
  }
}

const auth = new Auth();
export default auth;
