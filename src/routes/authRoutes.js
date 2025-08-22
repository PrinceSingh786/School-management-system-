const express = require("express");

const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/profile", authMiddleware(), (req, res) => {
  res.json({ message: "Profile accessed", user: req.user });
});

router.get(
  "/admin-only",
  authMiddleware(["admin", "superadmin"]),
  (req, res) => {
    res.json({ message: "Admin access granted", user: req.user });
  }
);

module.exports = router;
