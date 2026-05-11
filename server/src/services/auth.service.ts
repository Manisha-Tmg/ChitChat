import userModels from "../database/models/user.models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUserServices = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  profileImage: string,
) => {
  try {
    const hassedPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS),
    );

    const user = await userModels.create({
      firstName,
      lastName,
      email,
      password: hassedPassword,
      profileImage,
    });
    return {
      user: { firstName, lastName, email, profileImage },
    };
  } catch (error: any) {
    console.log(error.message);
  }
};

export const loginUserServices = async (email: string, password: string) => {
  try {
    const userExist = await userModels.findOne({ email });

    if (!userExist) {
      throw new Error("USER_NOT_FOUND");
    }

    const hashedPassword = await bcrypt.compare(password, userExist.password);

    if (!hashedPassword) {
      throw new Error("CREDENTIALS DIDN'T MATCH");
    }

    const token = jwt.sign(
      { _id: userExist._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "7d",
      },
    );

    return {
      token,
      user: {
        id: userExist.id,
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        email: userExist.email,
      },
    };
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const readAllUserServices = async () => {
  try {
    const users = await userModels.find();
    return users;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const userProfileServices = async (id: string) => {
  try {
    const data = await userModels.findOne({ id: id });
    console.log(data);
    // return { user: {first} };
  } catch (error: any) {
    console.log(error.message);
  }
};

export const readUserBYIdServices = async (id: string) => {
  try {
    const users = await userModels.findById(id);
    return users;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};

export const deleteUserServices = async (id: string) => {
  try {
    const users = await userModels.findById(id);
    return users;
  } catch (error: any) {
    console.log(error.message);
    throw error;
  }
};
