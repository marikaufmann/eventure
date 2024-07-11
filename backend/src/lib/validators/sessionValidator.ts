import { object, string, TypeOf } from "zod";

export const createSessionValidator = object({
  body: object({
    email: string({ required_error: "Email is required" }).email(
      "Not a valid email."
    ),
    password: string({ required_error: "Password is required" }),
  }),
});

export type createSessionRequest = TypeOf<typeof createSessionValidator>;
