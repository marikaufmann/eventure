import { object, string, TypeOf } from "zod";

export const registerFormValidator = object({
  firstName: string({ message: "First name is required" }),
  lastName: string({ message: "Last name is required" }),
  email: string({ message: "Email is required" }).email(
    "Not a valid email"
  ),
  password: string({ message: "Password is required" })
    .min(6, "Password too short - should be at least 6 characters")
    .max(30, "Password too long - should be 30 characters max"),
  confirmPassword: string({
    message: "Password confirmation is required",
  })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type registerFormRequest = TypeOf<typeof registerFormValidator>;
