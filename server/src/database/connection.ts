import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dataBase = process.env.DB_URL;

if (!dataBase) {
  throw new Error("DB_URL is missing in .env file");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(dataBase);

    console.log(`Application is connected to ${dataBase} successfully`);
  } catch (error) {
    console.log("Database connection failed", error);
    process.exit(1);
  }
};

export default connectToDatabase;
