import express from "express";

const sessionsRouter = express.Router();

sessionsRouter.get("/oauth/google", async (req, res) => {
  res.send("Hello World");
});

export default sessionsRouter;