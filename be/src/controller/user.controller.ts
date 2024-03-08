import express, { Request, Response } from "express";
import { getUserById } from "../service/user.service";
import { requireAuthorization } from "../middleware/requireAuthorization";

const userRouter = express.Router();

userRouter.get("/", requireAuthorization, async (req: Request, res: Response) => {
  const userId = res.locals.user.id;
  const user = await getUserById(userId);
  return res.send(user);
});

export default userRouter;
