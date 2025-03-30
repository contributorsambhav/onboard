import { connectDB } from "@/lib/connect";
import User from "@/lib/models/user.model";
import Recipient from "@/lib/models/recipients.model";
import Transaction from "@/lib/models/transaction.model";
import { NextResponse } from "next/server";

/**
 * Handles the creation of transactions for multiple recipients.
 *
 * This function processes a POST request to create transactions for a list of successful payments.
 * It validates the input data, checks if the user and recipients exist in the database, and then
 * creates transactions for each payment. If successful, it returns the created transactions in a
 * JSON response. Otherwise, it returns an appropriate error message.
 *
 * @async
 * @function POST
 * @param {Request} req - The HTTP request object containing the transaction details in the body.
 * @property {string} userId - The ID of the user initiating the transactions.
 * @property {Array} transactions - An array of payment objects, each containing:
 *   @property {string} recipientId - The ID of the recipient.
 *   @property {number} amount - The amount to be paid.
 *   @property {string} paymentMethod - The payment method used for the transaction.
 * @returns {Response} - A JSON response containing:
 *   @property {boolean} success - Indicates whether the operation was successful.
 *   @property {Array} [data] - An array of created transaction objects (if successful).
 *   @property {string} [message] - An error message (if the operation fails).
 */
export async function POST(req) {
  try {
    // console.log("Inside the POST method");
    const { userId, transactions } = await req.json();
    // console.log(transactions, userId);
    // Validate the input data (all fields are required).
    if (!userId || !transactions) {
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 },
      );
    }

    // console.log("userId-----------------", userId);

    // check if user with this id exists
    await connectDB();

    const userExists = await User.findOne({
      _id: userId,
    });

    if (!userExists) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 },
      );
    }
    const currentTransactions = [];
    for (const payment of transactions) {
      // add mail here instead of mail
      const recipient = await Recipient.findOne({
        email: payment.email,
      });

      if (!recipient) {
        return NextResponse.json(
          {
            message: `Recipient with ID ${payment.recipientId} not found`,
            success: false,
          },
          { status: 404 },
        );
      }

      const { _id } = recipient;
      // Extract the necessary details for the transaction.
      const { amount, paymentMethod } = payment;

      // Create a new transaction object.
      const newTransaction = {
        recipientId: _id,
        userId: userId,
        amount: amount,
        paymentMethod: paymentMethod,
        status: "completed",
      };

      // Save the transaction to the database.
      const transaction = await Transaction.create(newTransaction);
      currentTransactions.push(transaction);

      // If the transaction creation fails, return an error response.
      if (!transaction) {
        return NextResponse.json(
          { message: "Transaction creation failed", success: false },
          { status: 500 },
        );
      }
    }
    // Return a success response with the created transaction data.
    return NextResponse.json(
      { success: true, data: currentTransactions },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 },
    );
  }
}

/**
 * Handles the retrieval of transactions for a specific user.
 *
 * This function processes a GET request to retrieve all transactions associated with a specific user.
 * It validates the input data, checks if the user exists in the database, and then fetches the user's
 * transactions. If successful, it returns the transactions in a JSON response. Otherwise, it returns
 * an appropriate error message.
 *
 * @async
 * @function GET
 * @param {Request} req - The HTTP request object containing the user ID in the query parameters.
 * @returns {Response} - A JSON response containing the user's transactions or an error message.
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    // console.log(userId);

    // Validate the input data (userId is required).
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required", success: false },
        { status: 400 },
      );
    }

    // check if user with this id exists
    await connectDB();

    const userExists = await User.findOne({
      _id: userId,
    });

    if (!userExists) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 },
      );
    }

    // Fetch all transactions associated with the user.
    const transactions = await Transaction.find({ userId: userId }).populate(
      "recipientId", // Field to populate (must match the field in the Transaction schema).
      "name email paymentMethod", // Fields to include from the Recipient model.
    );

    // Check if any transactions were found.
    if (!transactions || transactions.length === 0) {
      return NextResponse.json(
        { message: "No transactions found for this user", success: false },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, data: transactions },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 },
    );
  }
}
