import chatModels from "../database/models/chat.models";

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
      .populate("members", "-createdAt -updatedAt")
      .select("-createdAt -updatedAt");
    return chat;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
