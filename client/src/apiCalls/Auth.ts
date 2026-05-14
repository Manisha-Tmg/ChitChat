import { axiosInstance } from ".";

const signUpUser = async (user: any) => {
  try {
    const response = await axiosInstance.post("/users/register", user);
    return response.data;
  } catch (error: any) {
    return error;
  }
};

export default signUpUser;
