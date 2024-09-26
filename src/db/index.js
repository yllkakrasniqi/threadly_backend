import mongoose from "mongoose";
import { config } from '../config.js';

const { db: { host, port, name} } = config
const mongo_uri = `mongodb://${host}:${port}/${name}`;

export const connectDB = async () => {
    mongoose
      .connect(mongo_uri, {
      })
      .then(() => {
        console.log("Connected to Mongo!");
      })
      .catch((err) => {
        console.error("Error connecting to Mongo", err);
      });
};
  
  