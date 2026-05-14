import chatModels from "../database/models/chat.models";
import messageModels from "../database/models/message.models";

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
  } catch (error:any) {
    throw new Error(error.message);
  }
};

export const getAllMessageServices = async (chatId: string) => {
  try {
    const messages = await messageModels
      .find({ chatOd: chatId })
      .sort({ createdAt: 1 });
    return messages;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
