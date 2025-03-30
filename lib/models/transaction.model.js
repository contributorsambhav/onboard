import { Schema, model, models } from "mongoose";

// Add other schema here if needed
const TransactionSchema = new Schema(
  {
    recipientId: {
      type: String,
      required: true,
      ref: "Recipient",
    },
    userId: {
      type: String,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Transaction =
  models?.Transaction || model("Transaction", TransactionSchema);
export default Transaction;
