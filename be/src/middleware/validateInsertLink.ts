import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { UrlLinkSchema } from "../db/schema";

export const validateInsertLink = async (
  req: Request<{}, {}, { url: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    UrlLinkSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      res
        .status(400)
        .send({ error: "Invalid request body", details: error.errors });
    } else {
      next(error);
    }
  }
};
