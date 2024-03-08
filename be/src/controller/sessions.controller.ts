import express, { Request, Response } from "express";
import { getGoogleOAuthTokens, upsertUser } from "../service/user.service";
import jwt from "jsonwebtoken";
import { GoogleUser } from "../types";
import {
  createSessionForUser,
  getUserSessions,
  updateSession,
} from "../service/session.service";
import { getTokenCookieOptions, signJwt } from "../utils/jwt.utils";
import { requireAuthorization } from "../middleware/requireAuthorization";

const sessionsRouter = express.Router();

sessionsRouter.get("/", requireAuthorization, async (req: Request, res: Response) => {
  const userId = res.locals.user.id;
  const sessions = await getUserSessions(userId);
  return res.send(sessions);
});

sessionsRouter.delete("/", requireAuthorization, async (req: Request, res: Response) => {
  // delete the session - in my case just update session to invalid and reset cookies
  const sessionId = res.locals.user.session;
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  // set the session to invalid
  await updateSession(sessionId, false);
  // return the session
  return res.send({ sessionId });
});

sessionsRouter.get("/oauth/google", async (req: Request, res: Response) => {
  const accessTokenTtl = process.env.ACCESS_TOKEN_TTL || "15m";
  const refreshTokenTtl = process.env.REFRESH_TOKEN_TTL || "7d";
  // get the code from qs
  const code = req.query.code as string;
  // get the token and id from the code
  try {
    const { id_token } = await getGoogleOAuthTokens(code);
    // get user with tokens
    const googleUser = jwt.decode(id_token) as GoogleUser;
    // upsert the user
    const user = await upsertUser(googleUser);
    // create a session
    const session = await createSessionForUser(user);
    // create access and refresh tokens
    const accessToken = signJwt(
      { ...user, session: session.id },
      { expiresIn: accessTokenTtl }
    );
    const refreshToken = signJwt(
      { ...user, session: session.id },
      { expiresIn: refreshTokenTtl }
    );
    // set cookies
    const accessTokenCookieOptions = getTokenCookieOptions(15 * 60 * 1000); // 15 minutes
    const refreshTokenCookieOptions = getTokenCookieOptions(
      7 * 24 * 60 * 60 * 1000
    ); // 7 days
    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    // redirect to client
    res.redirect(process.env.FE_ORIGIN as string);
  } catch (error: any) {
    console.error(error);
  }
});

export default sessionsRouter;
