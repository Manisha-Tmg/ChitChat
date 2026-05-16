import { axiosInstance } from ".";
import { API } from "./Api";

export const getLoggedUser = async () => {
  try {
    const response = axiosInstance.get(`${API}/users/logged-in-user`);
    return (await response).data;
  } catch (error: any) {
    return error;
  }
};
