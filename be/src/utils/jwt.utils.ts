import { CookieOptions } from "express";
import jwt from "jsonwebtoken";

type VerifyJwtResult = {
  valid: boolean;
  expired: boolean;
  decoded: any;
};

export const signJwt = (
  object: Object,
  options?: jwt.SignOptions | undefined
) => {
  const privateKey = process.env.PRIVATE_KEY as string;
  return jwt.sign(object, privateKey, {
    ...(options || {}),
    algorithm: "RS256",
  });
};

export const verifyJwt = (token: string): VerifyJwtResult => {
  const publicKey = process.env.PUBLIC_KEY as string;
  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ["RS256"] });
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.name === "TokenExpiredError",
      decoded: null,
    };
  }
};

export const getTokenCookieOptions = (maxAge: number): CookieOptions => ({
  maxAge,
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax", // TODO: check what is that
  secure: true,
});

export const getTokensFromCookie = (
  cookie: string
): { accessToken: string; refreshToken: string } | null => {
  const splittedCookie = cookie.split(";");
  const accessToken = splittedCookie.find((c) =>
    c.trim().startsWith("accessToken")
  );
  const refreshToken = splittedCookie.find((c) =>
    c.trim().startsWith("refreshToken")
  );
  if (!accessToken || !refreshToken) return null;
  return {
    accessToken: accessToken.split("=")[1],
    refreshToken: refreshToken.split("=")[1],
  };
};
