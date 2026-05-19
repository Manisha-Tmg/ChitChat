import { axiosInstance } from ".";
import { API } from "./Api";

export async function createMessage(data: string) {
  try {
    const response = await axiosInstance.post(
      `${API}/messages/new-message`,
      data,
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function getAllMessages(chatId: string) {
  try {
    const response = await axiosInstance.get(
      `${API}/messages/get-all-messages/${chatId}`,
    );
    return response.data;
  } catch (error) {
    return error;
  }
}
