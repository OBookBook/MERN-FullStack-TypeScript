import express, { Express } from "express";
import userRoute from "./routes/users";
import authRoute from "./routes/auth";
import postRoute from "./routes/posts";

const app: Express = express();

// Middleware
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// Listening
const PORT: number = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
