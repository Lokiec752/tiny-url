import { and, eq } from "drizzle-orm";
import db from "../db";
import { User, session } from "../db/schema";

export const createSessionForUser = async (user: User) => {
  const userSession = await db
    .insert(session)
    .values({
      id: crypto.randomUUID(),
      user_id: user.id,
      valid: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .returning();
  return userSession[0];
};

export const getUserSessions = async (userId: User["id"]) => {
  const sessions = await db
    .select()
    .from(session)
    .where(and(eq(session.user_id, userId), eq(session.valid, true)));
  return sessions;
};

export const updateSession = async (sessionId: string, valid: boolean) => {
  const updatedSession = await db
    .update(session)
    .set({ valid })
    .where(eq(session.id, sessionId))
    .returning();
  return updatedSession[0];
};
