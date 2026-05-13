import { CreatedAt } from "sequelize-typescript";
import chatModels from "../database/models/chat.models";
import messageModels from "../database/models/message.models";
import { after } from "node:test";

export const createMessageServices = async (
  chatId: string,
  text: string,
  sender: any,
) => {
  try {
    const newMessage = await messageModels.create({ chatId, text, sender });
    await chatModels.findByIdAndUpdate(
      chatId,
      {
        lastMessage: newMessage._id,
        $inc: {
          unreadMessageCount: 1,
        },
      },
      { returnDocument: "after" },
    );

    return newMessage;
  } catch (error) {
    throw error;
  }
};

export const getAllMessageServices = async (chatId: string) => {
  try {
    const messages = await messageModels
      .find({ chatOd: chatId })
      .sort({ createdAt: 1 });
    return messages;
  } catch (error) {
    throw error;
  }
};
