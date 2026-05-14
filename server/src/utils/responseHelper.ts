import { Response } from "express";

export const sendErrorResponse = (
  res: Response,
  message: string,
  statusCode: number,
  success: boolean = false,
) => {
  return res.status(statusCode).json({ message, success });
};

export const sendSuccessResponse = (
  res: Response,
  message: string,
  data: any,
  statusCode: number,
  success: boolean = true,
) => {
  return res.status(statusCode).json({ message, data, success });
};
