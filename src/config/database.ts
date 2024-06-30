import mongoose from "mongoose";
require("dotenv").config();

//
const MONGO_URL = process.env.MONGO_URL ?? "";

// DB CONNECTION
mongoose
  .connect(MONGO_URL, {
    connectTimeoutMS: 30000,
    socketTimeoutMS: 60000,
  })
  .then(() => {
    console.log("DB CONNECT SUCCESSFULLY");
  })
  .catch((err: string) => console.log("error", err));
