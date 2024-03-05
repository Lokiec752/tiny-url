import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import userRouter from "./routers/user";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.use("/api/users", userRouter);

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
