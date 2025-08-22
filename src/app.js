require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

const connectDB = require("./config/database"); // Adjust the path as needed

// Connect to the database
connectDB();
app.use(cookieParser());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("hello bruuuh!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
