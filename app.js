const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

app.use(express.json());

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes)

module.exports = app;