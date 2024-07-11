import { object, string, TypeOf } from "zod";

export const loginFormValidator = object({
  email: string({ message: "Email is required" }).email({
    message: "Invalid email.",
  }),
  password: string({ message: "Password is required" }),
});

export type loginFormRequest = TypeOf<typeof loginFormValidator>;
