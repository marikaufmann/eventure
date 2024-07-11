import mongoose from "mongoose";

export const dbConn = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
