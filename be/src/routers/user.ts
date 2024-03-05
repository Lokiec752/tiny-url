import express, { Request, Response } from "express";
import { getAllUsers } from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  res.send(await getAllUsers());
});

export default userRouter;
