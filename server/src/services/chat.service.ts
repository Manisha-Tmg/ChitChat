import chatModels from "../database/models/chat.models";

export const createChatServices = async (members: any) => {
  try {
    const chat = await chatModels.create(members);
    return chat;
  } catch (error: any) {
    throw error;
  }
};

export const getAllChatServices = async (id: string) => {
  try {
    const chat = await chatModels.find({ members: { $in: [id]} });
    return chat;
  } catch (error) {
    throw error;
  }
};
