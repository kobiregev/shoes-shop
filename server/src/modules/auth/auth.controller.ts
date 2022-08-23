import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { findUserByEmail } from "../user/user.service";
import { signJwt } from "./auth.utils";
import omit from "../../helpers/omit";
import { LoginSchemaBody } from "./auth.schema";

export async function loginHandler(
  req: Request<{}, {}, LoginSchemaBody>,
  res: Response
) {
  const { email, password } = req.body;

  //   find user by email
  const user = await findUserByEmail(email);

  const isPasswordVerified = await user?.comparePassword(password);

  if (!user || !isPasswordVerified) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send("Invalid email or password");
  }

  const payload = omit(user.toJSON(), ["password", "comparePassword",]);

  const jwt = signJwt(payload);

  res.cookie("accessToken", jwt, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: "localhost", // TODO :change when deploying
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  return res.status(StatusCodes.OK).send(jwt);
}
