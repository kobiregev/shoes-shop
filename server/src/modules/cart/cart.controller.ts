import { Response, Request } from "express";
import { StatusCodes } from "http-status-codes";
import { findCartByUserId } from "./cart.service";

export async function getCartHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user;

    const cart = await findCartByUserId(user._id);

    return res.status(StatusCodes.OK).send(cart);
  } catch (e: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
