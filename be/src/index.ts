import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import userRouter from "./controller/user.controller";
import googleRouter from "./controller/google.controller";
import sessionsRouter from "./controller/sessions.controller";
import { deserializeUser } from "./middleware/deserializeUser";

dotenv.config({ path: "../.env" });

const app: Express = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.use(deserializeUser);

app.use("/api/users", userRouter);
app.use("/api/google", googleRouter);
app.use("/api/sessions", sessionsRouter);

// GET short url
app.get("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

// POST long url
app.post("/", async (req: Request, res: Response) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// TODO: handle /oauth2/v2/auth route (https://www.youtube.com/watch?v=Qt3KJZ2kQk0&t=321s)