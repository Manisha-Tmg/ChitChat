import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firtstName: {
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
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc: any, ret: any) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

export default mongoose.model("users", userSchema);
