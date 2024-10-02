import { CookieOptions, Request, Response } from "express";
import {
  createUser,
  deleteUser,
  findAndUpdateUser,
  findUser,
} from "../service/user.service";
import {
  createSession,
  deleteAllSessions,
  findSession,
} from "../service/session.service";
import {
  CreateUserRequest,
  createUserValidator,
  DeleteUserRequest,
  EditUserRequest,
} from "../lib/validators/userValidator";
import { signJwt } from "../lib/utils/jwt";
import bcrypt from 'bcryptjs';

const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

const refreshTokenCookieOptions: CookieOptions = {
  ...accessTokenCookieOptions,
  maxAge: 8.64e7,
};
export const createUserHandler = async (
  req: Request<{}, {}, CreateUserRequest["body"]>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    if (!user) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }
    const session = await createSession(user._id, req.get("user-agent") || "");
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

    return res.send({ accessToken, refreshToken });
  } catch (err: any) {
    if (err.message.includes("Duplicate key error")) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }
    return res
      .status(500)
      .json({ message: "Something went wrong, please try again." });
  }
};
export const editUserHandler = async (
  req: Request<EditUserRequest["params"], {}, EditUserRequest["body"]>,
  res: Response
) => {
  try {
    if (req.user._id !== req.params.userId) {
      return res.status(401).send("Unauthorized");
    }
    const updateData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
    };

    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedUser = await findAndUpdateUser(
      { _id: req.params.userId },
      updateData,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json({ message: "User updated successfully." });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};
export const deleteUserHandler = async (
  req: Request<DeleteUserRequest["params"]>,
  res: Response
) => {
  try {
    if (req.user._id !== req.params.userId) {
      return res.status(401).send("Unauthorized");
    }
    const user = await findUser({ _id: req.params.userId });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    await deleteAllSessions({ user: user._id });
    await deleteUser({ _id: user._id });

    return res.status(200).json({ message: "Account permanently deleted." });
  } catch (err: any) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
};
export const getCurrentUserHandler = async (req: Request, res: Response) => {
  const user = await findUser({ _id: req.user._id });
  return res.send(user);
};
