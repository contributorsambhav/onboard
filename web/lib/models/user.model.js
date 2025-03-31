import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    emailVerified: { type: Boolean, required: true },
    image: { type: String },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  {
    collection: "user",
  },
);

const User = models.User || model("User", UserSchema);
export default User;
