import express, { Request, Response } from "express";
import { requireAuthorization } from "../middleware/requireAuthorization";
import { createLink, getOriginalUrl } from "../service/link.service";
import { validateInsertLink } from "../middleware/validateInsertLink";

const shortenerRouter = express.Router();

shortenerRouter.get("/:id", async (req: Request, res: Response) => {
  const shortUrlId = req.params.id;
  const originalUrl = await getOriginalUrl(shortUrlId);
  if (!originalUrl) {
    return res.status(404).sendFile("404.html", { root: "src/public" });
  }
  res.redirect(originalUrl.original_url);
});

shortenerRouter.post(
  "/",
  requireAuthorization,
  validateInsertLink,
  async (req: Request<{}, {}, { url: string }>, res: Response) => {
    const { url } = req.body;
    const user = res.locals.user;
    const newLink = await createLink(user.id, url);
    return res.status(201).send({ shortUrl: newLink.short_url });
  }
);

export default shortenerRouter;
