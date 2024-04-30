import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/latestdb";

export const connectDB = async () => {
    mongoose
      .connect(MONGO_URI, {
      })
      .then(() => {
        console.log("Connected to Mongo!");
      })
      .catch((err) => {
        console.error("Error connecting to Mongo", err);
      });
};
  
  