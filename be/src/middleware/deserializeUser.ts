import { NextFunction, Request, Response } from "express";
import { getAccessTokenFromCookie, verifyJwt } from "../utils/jwt.utils";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = getAccessTokenFromCookie(req.headers.cookie || "");
  if (!accessToken) {
    return next();
  }
  const { decoded, expired } = verifyJwt(accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  return next();
};
