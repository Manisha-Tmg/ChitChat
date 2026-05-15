import { axiosInstance } from ".";

const API = "http://localhost:8000/api";
export const signUpUser = async (user: any) => {
  try {
    const response = await axiosInstance.post(`${API}/users/register`, user);
    console.log(response);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export const LoginUser = async (user: any) => {
  try {
    const response = await axiosInstance.post(`${API}/users/login`, user);
    return response.data;
  } catch (error: any) {
    return error;
  }
};
