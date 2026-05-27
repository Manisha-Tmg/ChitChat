import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dataBase = process.env.MONGO_URL;

if (!dataBase) {
  throw new Error(`${dataBase} is missing in .env file`);
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dataBase);

    console.log(`Application is connected successfully`);
  } catch (error: any) {
    console.log("Database connection failed", error.message);
    process.exit(1);
  }
};

export default connectToDatabase;
