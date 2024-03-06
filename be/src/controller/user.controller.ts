import express, { Request, Response } from "express";
import { getAllUsers } from "../service/user.service";

const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  res.send(await getAllUsers());
});

export default userRouter;
