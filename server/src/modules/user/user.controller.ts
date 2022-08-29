import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUser } from "./user.service";
import { RegisterUserBody } from "./user.schema";
import { createCart } from "../cart/cart.service";

export async function registerUserHandler(
  req: Request<{}, {}, RegisterUserBody>,
  res: Response
) {
  const { email, password, name } = req.body;
  try {
    const user = await createUser({ email, password, name });
    await createCart(user._id);
    return res.status(StatusCodes.CREATED).send("User created successfully");
  } catch (e: any) {
    if (e.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send("User already exists");
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
