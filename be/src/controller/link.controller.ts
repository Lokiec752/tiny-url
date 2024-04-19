import express, { Request, Response } from "express";
import { requireAuthorization } from "../middleware/requireAuthorization";
import { deleteLink, getAllLinksByUserId } from "../service/link.service";

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

linkRouter.delete(
  "/:id",
  requireAuthorization,
  async (req: Request, res: Response) => {
    const linkId = req.params.id;
    const deletedLink = await deleteLink(linkId);
    res.send(deletedLink);
  }
);

export default linkRouter;
