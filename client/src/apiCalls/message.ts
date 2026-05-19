import { axiosInstance } from ".";
import { API } from "./Api";

export async function createMessage(message: string) {
  try {
    const response = await axiosInstance.post(`${API}/messages/new-message`, {
      message,
    });
    return response.data;
  } catch (error) {
    return error;
  }
}
