import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import userRouter from "./controller/user.controller";
import googleRouter from "./controller/google.controller";
import sessionsRouter from "./controller/sessions.controller";
import { deserializeUser } from "./middleware/deserializeUser";
import shortenerRouter from "./controller/shortener.controller";
import linkRouter from "./controller/link.controller";

dotenv.config({ path: "../.env" });

const app: Express = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.get("/short/:id", async (req: Request, res: Response) => {
  console.log("Redirecting to original URL");
  res.redirect(`/api/shortener/${req.params.id}`);
});

app.use(deserializeUser);

app.use("/api/shortener", shortenerRouter);
app.use("/api/user", userRouter);
app.use("/api/google", googleRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/links", linkRouter);

// GET short url
app.get("/", async (req: Request, res: Response) => {
  const FE_ORIGIN = process.env.FE_ORIGIN as string;
  res.redirect(FE_ORIGIN);
});

// POST long url
app.post("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
