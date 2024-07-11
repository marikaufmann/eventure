import { NextFunction, Request, Response } from "express";
import { verifyJwt } from "../lib/utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { reIssueAccessToken } from "../service/session.service";
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}
export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies["access_token"];
  const refreshToken = req.cookies["refresh_token"];
  if (!accessToken && !refreshToken) {
    return next();
  }
  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    req.user = decoded as JwtPayload;
    return next();
  }
  if ((!accessToken && refreshToken) || (expired && refreshToken)) {
    const newAccessToken = await reIssueAccessToken(refreshToken);

    if (newAccessToken) {
      res.cookie("access_token", newAccessToken, {
        maxAge: 900000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
    }
    const result = verifyJwt(newAccessToken as string);
    req.user = result.decoded as JwtPayload;
    return next();
  }

  return next();
};
