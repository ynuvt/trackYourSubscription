import mongoose from "mongoose";
import { NODE_ENV, DB_URI } from "../config/env.js";

const connectToDb = async () => {
  if (!DB_URI) {
    throw new Error(`Please check DB_URI in the ${NODE_ENV} environment file`);
  } else {
    try {
      await mongoose.connect(DB_URI);
      console.log(`Connected to Database in ${NODE_ENV} environment`);
    } catch (error) {
      console.log(`error : ${error}`);
      process.exit(1);
    }
  }
};

export default connectToDb;
