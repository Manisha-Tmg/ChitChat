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
      { new: true },
    );

    return newMessage;
  } catch (error) {
    throw error;
  }
};
