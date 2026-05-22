import chatModels from "../database/models/chat.models";
import messageModels from "../database/models/message.models";

export const createChatServices = async (members: any) => {
  try {
    const chat = await chatModels.create(members);
    return chat;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getAllChatServices = async (id: string) => {
  try {
    const chat = await chatModels
      .find({ members: { $in: [id] } })
      .populate("members")
      .populate("lastMessage")
      .sort({ updatedAt: -1 });
    return chat;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const clearReadChatServices = async (id: string) => {
  try {
    const chat = await chatModels.findById(id);
    if (!chat) {
      throw Error("Chat not found");
    }

    const chatUpdate = await chatModels
      .findByIdAndUpdate(
        id,
        {
          unreadMessageCount: 0,
        },
        { returnDocument: "after" },
      )
      .populate("members")
      .populate("lastMessage");
    await messageModels.updateMany(
      {
        chatId: id,
        read: false,
      },
      {
        $set: {
          read: true,
        },
      },
    );
    return chatUpdate;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
