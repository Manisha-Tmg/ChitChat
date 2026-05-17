import { axiosInstance } from ".";
import { API } from "./Api";

export const getLoggedUser = async () => {
  try {
    const response = await axiosInstance.get(
      `${API}/users/protected/logged-in-user`,
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const getALlUser = async () => {
  try {
    const response = await axiosInstance.get(
      `${API}/users/protected/get-all-users`,
    );
    return response.data;
  } catch (error: any) {
    return error;
  }
};
