import { NextFunction, Request, Response } from "express";
import { getTokenCookieOptions, getTokensFromCookie, verifyJwt } from "../utils/jwt.utils";
import { reIssueAccessToken } from "../service/session.service";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const tokens = getTokensFromCookie(req.headers.cookie || "");
  if (!tokens) {
    return next();
  }
  const { decoded, expired } = verifyJwt(tokens.accessToken);
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }
  if (expired) {
    const newAccessToken = await reIssueAccessToken(tokens.refreshToken);
    if (newAccessToken) {
      res.cookie("accessToken", newAccessToken, getTokenCookieOptions(15 * 60 * 1000));
      res.locals.user = verifyJwt(newAccessToken).decoded;
    }
    return next();
  }
  return next();
};
