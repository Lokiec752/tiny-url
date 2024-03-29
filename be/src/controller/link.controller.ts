import express, { Request, Response } from "express";
import { requireAuthorization } from "../middleware/requireAuthorization";
import { getAllLinksByUserId } from "../service/link.service";

const linkRouter = express.Router();

linkRouter.get(
  "/",
  requireAuthorization,
  async (req: Request, res: Response) => {
    const userId = res.locals.user.id;
    const links = await getAllLinksByUserId(userId);
    res.send(links);
  }
);

export default linkRouter;
