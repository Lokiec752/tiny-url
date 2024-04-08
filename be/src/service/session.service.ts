import { and, eq } from "drizzle-orm";
import db from "../db";
import { User, session } from "../db/schema";
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { getUserById } from "./user.service";

export const createSessionForUser = async (user: User) => {
  await db.insert(session).values({
    id: crypto.randomUUID(),
    user_id: user.id,
    valid: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
  const userSession = await db
    .select()
    .from(session)
    .where(eq(session.user_id, user.id));
  return userSession[0];
};

export const getUserSessions = async (userId: User["id"]) => {
  const sessions = await db
    .select()
    .from(session)
    .where(and(eq(session.user_id, userId), eq(session.valid, true)));
  return sessions;
};

export const getUserSessionById = async (sessionId: string) => {
  const userSession = await db
    .select()
    .from(session)
    .where(eq(session.id, sessionId));
  return userSession[0];
};

export const updateSession = async (sessionId: string, valid: boolean) => {
  await db.update(session).set({ valid }).where(eq(session.id, sessionId));
  const updatedSession = await db
    .select()
    .from(session)
    .where(eq(session.id, sessionId));
  return updatedSession[0];
};

export const reIssueAccessToken = async (refreshToken: string) => {
  const { decoded } = verifyJwt(refreshToken);
  if (!decoded && !decoded.session) return false;
  const sessions = await getUserSessionById(decoded.session);
  if (!sessions || !sessions.valid) return false;

  const user = await getUserById(decoded.id);
  if (!user) return false;
  const newAccessToken = signJwt(
    { ...user, session: sessions.id },
    { expiresIn: process.env.ACCESS_TOKEN_TTL }
  );
  return newAccessToken;
};
