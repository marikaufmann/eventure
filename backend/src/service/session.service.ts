import { signJwt, verifyJwt } from "../lib/utils/jwt";
import { SessionModel } from "../models/session.model";
import { findUser } from "./user.service";
import { SessionType, UserType } from "../shared/types";
import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import axios from "axios";
export const createSession = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({ user: userId, userAgent });
  return session.toJSON();
};
export const findSessions = async (query: FilterQuery<SessionType>) => {
  return await SessionModel.find(query).lean().exec();
};
export const findSession = async (id: FilterQuery<SessionType>) => {
  return await SessionModel.findById(id).lean().exec();
};
export const updateSession = async (
  query: FilterQuery<SessionType>,
  update: UpdateQuery<SessionType>
) => {
  return await SessionModel.updateOne(query, update);
};

export const deleteAllSessions = async (query: FilterQuery<SessionType>) => {
  return await SessionModel.deleteMany(query)
}
export const reIssueAccessToken = async (refreshToken: string) => {
  const { decoded } = verifyJwt(refreshToken);
  if (!decoded || !get(decoded, "session")) return false;
  const session = await SessionModel.findById(get(decoded, "session"));
  if (!session || !session.valid) return false;
  const user = await findUser({ _id: session.user });
  if (!user) return false;
  const newAccessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: "15m" }
  );
  return newAccessToken;
};


