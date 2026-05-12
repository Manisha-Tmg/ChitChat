import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "name is required"],
    },
    lastName: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true, // allowing user to use only one email to register
    },
    password: {
      type: String,
      required: [true, "password is required"],
      select: false,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("users", userSchema);
