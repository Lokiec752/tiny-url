import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3333;

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
