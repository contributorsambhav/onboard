import { createAuthClient } from "better-auth/react";
import dotenv from "dotenv";

dotenv.config();

export const { signIn, signOut, signUp, useSession } = createAuthClient({
  baseURL: process.env.BASE_URL,
});
