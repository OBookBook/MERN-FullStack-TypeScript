import express, { Express } from "express";
import userRoute from "./routes/users";
import authRoute from "./routes/auth";
import postRoute from "./routes/posts";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

// Database
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => {
    console.log("db connected");
  })
  .catch(() => {
    console.log("db connection failed");
  });

// Middleware
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// Listening
const PORT: number = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
