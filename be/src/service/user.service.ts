import axios from "axios";
import db from "../db";
import { User, NewUser, users } from "../db/schema";
import { eq } from "drizzle-orm";
import qs from "qs";
import { GoogleTokensResult, GoogleUser } from "../types";

export const getAllUsers = async () => {
  const allLinks = await db.select().from(users);
  return allLinks;
};

export const getUserById = async (id: User["id"]) => {
  const user = await db.select().from(users).where(eq(users.id, id));
  return user;
};

export const getUserByEmail = async (email: User["email"]) => {
  const user = await db.select().from(users).where(eq(users.email, email));
  return user;
};

export const createUser = async (newUser: Omit<NewUser, "id">) => {
  const newUserId = crypto.randomUUID();
  const creationDate = new Date().toISOString();
  await db
    .insert(users)
    .values({ ...newUser, id: newUserId, created_at: creationDate });
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

export const upsertUser = async (user: GoogleUser) => {
  const existingUser = await getUserByEmail(user.email);
  if (existingUser.length) {
    return updateUser({
      ...existingUser[0],
      ...{ email: user.email, name: user.name },
    });
  } else {
    return createUser({
      email: user.email,
      name: user.name,
    });
  }
};

export const getGoogleOAuthTokens = async (
  code: string
): Promise<GoogleTokensResult> => {
  // get the token and id from the code
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: process.env.REDIRECT_URI,
    grant_type: "authorization_code",
  };

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error getting Google OAuth tokens");
  }
};
