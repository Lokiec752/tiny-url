import db from "../db";
import { User, NewUser, users } from "../db/schema";
import { eq } from "drizzle-orm";

export const getAllUsers = async () => {
  const allLinks = await db.select().from(users);
  return allLinks;
};

export const getUserById = async (id: User["id"]) => {
  const user = await db.select().from(users).where(eq(users.id, id));
  return user;
};

export const createUser = async (newUser: Omit<NewUser, "id">) => {
  const newUserId = crypto.randomUUID();
  await db.insert(users).values({ ...newUser, id: newUserId });
  return newUser;
};

export const updateUser = async (data: User) => {
  const updatedUser = await db
    .update(users)
    .set(data)
    .where(eq(users.id, data.id));
  return updatedUser;
};

export const deleteUser = async (id: User["id"]) => {
  await db.delete(users).where(eq(users.id, id));
};
