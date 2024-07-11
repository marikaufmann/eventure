import { NextFunction, Request, Response } from "express";

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "Unauthorized" });
  return next();
};
