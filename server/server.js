const express = require("express");
const app = express();

// Middleware
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

// Listening
const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
