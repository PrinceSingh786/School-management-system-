const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const {
  createSchool,
  getSchoolById,
  updateSchool,
  deleteSchool,
} = require("../controllers/schoolController");

// Public: get school by id
router.get("/:id", getSchoolById);

// Protected: create/update/delete - only admin/superadmin
router.post("/", auth(["admin", "superadmin"]), createSchool);
router.patch("/:id", auth(["admin", "superadmin"]), updateSchool);
router.delete("/:id", auth(["admin", "superadmin"]), deleteSchool);


module.exports = router;


