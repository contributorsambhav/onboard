import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connect";
import Recipient from "@/lib/models/recipients.model";

/**
 * Handles the creation of a new recipient.
 *
 * This function connects to the database, validates the input data, and creates a new recipient
 * in the database. It ensures that all required fields are provided and returns appropriate
 * responses based on the success or failure of the operation.
 *
 * @async
 * @function POST
 * @param {Request} req - The HTTP request object containing recipient data in JSON format.
 * @returns {Response} - A JSON response indicating success or failure.
 */
export async function POST(req) {
  try {
    await connectDB();
    const { name, email, country, paymentMethod, amount, userId } =
      await req.json();
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 },
      );
    }

    // console.log(name, email, country, paymentMethod, amount, userId);

    // Validate the input data (all fields are required).
    // TODO: Add zod or another validation library for stricter validation.
    if (!name || !email || !country || !paymentMethod || !amount) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    // Create a new recipient object.
    const newRecipient = {
      name,
      email,
      country,
      paymentMethod,
      amount,
      userId,
    };

    // Save the recipient to the database.
    const recipient = await Recipient.create(newRecipient);

    // Check if the recipient creation was successful.
    if (!recipient) {
      return NextResponse.json(
        { message: "Recipient creation failed" },
        { status: 500 },
      );
    }

    // Return a success response with the created recipient data.
    return NextResponse.json(
      { success: true, data: recipient },
      { status: 201 },
    );
  } catch (err) {
    console.error(err); // Log any errors that occur.
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/**
 * Retrieves recipients associated with a specific user.
 *
 * This function connects to the database, extracts the `userId` from the query parameters,
 * and fetches all recipients associated with that user. It returns the recipients in a JSON
 * response or an error message if the operation fails.
 *
 * @async
 * @function GET
 * @param {Request} req - The HTTP request object containing query parameters.
 * @returns {Response} - A JSON response containing the recipients or an error message.
 */
export async function GET(req) {
  try {
    await connectDB(); // Establish a connection to the database.

    // Extract query parameters from the request URL.
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // Check if the user ID is provided.
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 },
      );
    }

    // Fetch recipients associated with the provided user ID.
    const recipients = await Recipient.find({
      userId: userId,
    });

    // Return a success response with the retrieved recipients.
    return NextResponse.json(
      { success: true, data: recipients },
      { status: 200 },
    );
  } catch (err) {
    console.error(err); // Log any errors that occur.
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
