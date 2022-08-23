import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ROLES } from "../modules/user/user.model";

// For Admin routes
function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;
  if (user.role !== ROLES.ADMIN) {
    return res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
  return next;
}
export default requireAdmin;
