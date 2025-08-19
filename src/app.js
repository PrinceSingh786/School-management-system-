require("dotenv").config();

const express = require("express");

const app = express();

const connectDB = require("./config/database"); // Adjust the path as needed

// Connect to the database
connectDB();

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello bruuuh!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
