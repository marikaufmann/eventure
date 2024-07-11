import { CookieOptions, Request, Response } from "express";
import {
  createSession,
  findSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import {
  findAndUpdateUser,
  getGoogleOAuthTokens,
  getGoogleUser,
  validatePassword,
} from "../service/user.service";
import { signJwt } from "../lib/utils/jwt";
import { createSessionRequest } from "../lib/validators/sessionValidator";

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000,
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
};
const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 8.64e7,
};

export const createSessionHandler = async (
  req: Request<{}, {}, createSessionRequest["body"]>,
  res: Response
) => {
  try {
    const user = await validatePassword(req.body);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }
    const session = await createSession(user._id, req.get("user-agent") ?? "");
    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: "15m" }
    );
    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: "1d" }
    );
    res.cookie("access_token", accessToken, accessTokenCookieOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);

    return res.status(201).json({ accessToken, refreshToken });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }
};
export const getSessionsHandler = async (req: Request, res: Response) => {
  try {
    const sessions = await findSessions({ user: req.user._id });
    return res.send(sessions);
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized." });
  }
};
export const getCurrentSessionHandler = async (req: Request, res: Response) => {
  const session = await findSession(req.user.session);
  if (!session || !session.valid) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  return res.status(200).send(req.user.session);
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
  try {
    await updateSession({ _id: req.user.session }, { valid: false });
    return res.send({ accessToken: null, refreshToken: null });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};

export const googleOauthHandler = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    const redirect_url = decodeURIComponent(req.query.state as string);
    const { access_token, id_token } = await getGoogleOAuthTokens(code);
    const googleUser = await getGoogleUser(id_token, access_token);
    if (!googleUser || !googleUser.verified_email) {
      return res
        .status(403)
        .json({ message: "Google account is not verified." });
    }
    const user = await findAndUpdateUser(
      {
        email: googleUser.email,
      },
      {
        email: googleUser.email,
        firstName: googleUser.given_name,
        lastName: googleUser.family_name,
        picture: googleUser.picture,
      },
      {
        upsert: true,
        new: true,
      }
    );
    const session = await createSession(user!._id, req.get("user-agent") ?? "");
    const accessToken = signJwt(
      { ...user!.toJSON(), session: session._id },
      { expiresIn: "15m" }
    );
    const refreshToken = signJwt(
      { ...user!.toJSON(), session: session._id },
      { expiresIn: "1d" }
    );
    res.cookie("access_token", accessToken, accessTokenCookieOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);

    res.redirect(
      `${process.env.FRONTEND_URL}${redirect_url}` ||
        (process.env.FRONTEND_URL as string)
    );
  } catch (err: any) {
    console.error(err);
    return res.redirect(`${process.env.API_URL}/oauth/error`);
  }
};
