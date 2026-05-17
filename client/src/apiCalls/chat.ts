import { axiosInstance } from ".";
import { API } from "./Api";

export async function getAllChats() {
  try {
    const response = await axiosInstance.get(`${API}/chats/get-all-chats`);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function createChats(members: string[]) {
  try {
    const response = await axiosInstance.post(`${API}/chats/create-new-chat`, {
      members,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
