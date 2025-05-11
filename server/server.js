const express = require("express");
const app = express();

// Middleware
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

// Listening
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
