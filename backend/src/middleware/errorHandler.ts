import { NextFunction, Request, Response } from "express";
import { logEvents } from "./logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logEvents(
    `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`,
    "errLog.log"
  );
  console.log(err.stack);
  const status = res.statusCode ?? 500;
  return res.status(status).json({ message: err.message });
};

