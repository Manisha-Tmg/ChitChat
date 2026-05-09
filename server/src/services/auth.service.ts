import userModels from "../database/models/user.models";

export const registerUserServices = async (
  firtstName: string,
  lastName: string,
  email: string,
  password: string,
  profileImage: string,
) => {
  try {
    const user = await userModels.create({
      firtstName,
      lastName,
      email,
      password,
      profileImage,
    });
    return { user: { firtstName, lastName, email, password, profileImage } };
  } catch (error: any) {
    console.log(error.message);
  }
};
