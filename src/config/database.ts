const mongoose = require("mongoose");
require("dotenv").config();

//
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 60000,
  })
  .then(() => {
    console.log("DB CONNECT SUCCESSFULLY");
  })
  .catch((err: string) => console.log("error", err));
