const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)

module.exports = app;