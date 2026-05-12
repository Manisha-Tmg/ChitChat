import chatModels from "../database/models/chat.models";

export const createChatServices = async (members: [any]) => {
  try {
    const chat = await chatModels.create(members);
    console.log(chat);
    return chat;
  } catch (error: any) {
    throw error;
  }
};
