import { connectDB } from "@/lib/connect";
import { populateRecipients } from "@/lib/data";
import Recipient from "@/lib/models/recipients.model";
import User from "@/lib/models/user.model";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const { userId } = await req.json();
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required", success: false },
        { status: 400 },
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { message: "Invalid User ID format", success: false },
        { status: 400 },
      );
    }

    await connectDB();
    // check if the user exits with this userId
    const userExists = await User.findOne({
      _id: userId,
    });
    // console.log(userExists);
    if (!userExists) {
      return NextResponse.json(
        { message: "User not found", success: false },
        { status: 404 },
      );
    }

    // first check if recipeints are already populated if only one is present there te
    const recipeintExist = await Recipient.findOne({
      userId: userId,
    });

    if (recipeintExist) {
      return NextResponse.json(
        {
          success: false,
          message: "Recipient already exists under this user",
        },
        {
          status: 400,
        },
      );
    }

    const recipients = await populateRecipients(userId);
    if (!recipients) {
      return NextResponse.json(
        { message: "No recipients found", success: false },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: recipients,
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 },
    );
  }
}
