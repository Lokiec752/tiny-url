import express, { Request, Response } from "express";
import { getGoogleOAuthTokens, upsertUser } from "../service/user.service";
import jwt from "jsonwebtoken";
import { GoogleUser } from "../types";

const sessionsRouter = express.Router();

sessionsRouter.get("/oauth/google", async (req: Request, res: Response) => {
  // get the code from qs
  const code = req.query.code as string;
  // get the token and id from the code
  try {
    const { id_token, access_token } = await getGoogleOAuthTokens(code);
    console.log({ id_token, access_token });
    // get user with tokens
    const googleUser = jwt.decode(id_token) as GoogleUser;
    // upsert the user
    const user = await upsertUser(googleUser);
    // create a session
    
    // create access and refresh tokens

    // set cookies

    // redirect to client
  } catch (error: any) {
    console.error(error);
  }
});

export default sessionsRouter;
