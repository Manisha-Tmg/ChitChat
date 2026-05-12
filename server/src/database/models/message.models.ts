import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chats",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    text: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
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

export default mongoose.model("messages", messageSchema);
