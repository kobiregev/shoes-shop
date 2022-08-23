import { object, string, TypeOf } from "zod";

export const registerUserSchema = {
  body: object({
    email: string({
      required_error: "email is required",
    }).email("must be a valid email"),
    name: string({
      required_error: "name is required",
    }),
    password: string({
      required_error: "password is required",
    })
      .min(6, "Password must be at least 6 characters long")
      .max(64, "Password should not be longer than 64 characters"),
    confirmPassword: string({
      required_error: "confirmPassword is required",
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }),
};

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
