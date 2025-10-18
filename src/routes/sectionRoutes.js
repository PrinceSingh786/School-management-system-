const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const {
  createSection,
  updateSection,
  deleteSection,
  getSections   ,
  getSectionById
  } = require("../controllers/sectionController");

// Get all classes/grades for a school
router.get("/school/:schoolId", getSections);

// Get one class/grade by id
router.get("/:id", getSectionById);

// Protected: create/update/delete - only admin/superadmin
router.post("/", auth(["admin", "superadmin"]), createSection);
router.patch("/:id", auth(["admin", "superadmin"]), updateSection);
router.delete("/:id", auth(["admin", "superadmin"]), deleteSection);

module.exports = router;
