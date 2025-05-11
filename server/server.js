const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const PORT = 3000;

// Middleware
app.use("/api/users", userRoute);

// Listening
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
