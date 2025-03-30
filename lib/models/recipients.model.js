import { Schema, model, models } from "mongoose";

const RecipientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    // Might changet this String to objectID from mongoose
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const Recipient = models?.Recipient || model("Recipient", RecipientSchema);
export default Recipient;
