import express from "express";

const googleRouter = express.Router();

googleRouter.get("/", async (req, res) => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    client_id: process.env.CLIENT_ID as string,
    redirect_uri: process.env.REDIRECT_URI as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
  };

  const qs = new URLSearchParams(options).toString();

  const googleAuthUrl = `${rootUrl}?${qs.toString()}`;

  res.json({ googleAuthUrl });
});

export default googleRouter;
