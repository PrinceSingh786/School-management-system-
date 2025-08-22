const jwt = require("jsonwebtoken");

const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const token = req.cookies.token; // ⬅️ get JWT from cookie

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      if (roles.length && !roles.includes(req.user.role)) {
        return res
          .status(403)
          .json({ message: "Forbidden: You do not have the required role" });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: "Unauthorized access" });
    }
  };
};
module.exports = authMiddleware;
