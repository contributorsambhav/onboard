export const config = {
  unstable_allowDynamic: [
    '/lib/utilities.js', // allows a single file
    '**/node_modules/function-bind/**', // use a glob to allow anything in the function-bind 3rd party module
  ],};
import { betterFetch } from "@better-fetch/fetch";
import { headers } from "next/headers";
import Recipient from "./models/recipients.model";
import { recipientsData } from "./constants";

/**
 * Retrieves the user's authentication session data from the API
 *
 * This function fetches the current user session by forwarding cookies from the incoming request
 * to the authentication endpoint. It's used in server components to check authentication status
 * and access user information.
 *
 * @async
 * @returns {Promise<Object|null>} The user session object if authenticated, null otherwise
 */
export async function getSession() {
  const headersList = await headers();
  const { data: session } = await betterFetch("/api/auth/get-session", {
    baseURL: process.env.BETTER_AUTH_URL,
    headers: {
      // get the cookie from the request
      cookie: headersList.get("cookie") || "",
    },
  });
  return session?.user ? session.user : null;
}

/**
 * Populates the recipients collection with predefined data for a specific user.
 *
 * This function iterates over the `recipientsData` array, creates a new `Recipient` object
 * for each entry, associates it with the provided `userId`, and saves it to the database.
 * It logs each successfully saved recipient and handles errors gracefully.
 *
 * @async
 * @function populateRecipients
 * @param {string} userId - The ID of the user to associate the recipients with.
 * @returns {Promise<void>} - Resolves when all recipients are saved or logs an error if any occur.
 */
export async function populateRecipients(userId) {
  try {
    for (const recipient of recipientsData) {
      const newRecipient = new Recipient({
        ...recipient,
        userId,
      });
      await newRecipient.save();
    }
    const recipients = await Recipient.find({
      userId: userId,
    });
    return recipients;
  } catch (err) {
    console.error("Error populating recipients:", err);
  }
}

export async function getRecipients(userId) {
  try {
    // Fetch recipients from the database
    const recipients = await Recipient.find({
      userId: userId,
    });
    return recipients;
  } catch (err) {
    console.log(err);
  }
}
