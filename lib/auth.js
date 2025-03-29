import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { connect } from "./connect";
import { nextCookies } from "better-auth/next-js";
import dotenv from "dotenv";

dotenv.config();

const client = await connect();
// Helper function to verify required environment variables -- iife immediatlet invoked functions
(function verifyEnvVars() {
  const requiredVars = [
    "DB_NAME",
    "MONGODB_URI",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET",
    "NEXTAUTH_SECRET",
  ];

  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }

  return true;
})();

export const auth = betterAuth({
  database: mongodbAdapter(client.db(process.env.DB_NAME)),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 10, // 10 minutes
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [nextCookies()],
});
