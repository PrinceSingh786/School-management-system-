const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const {
  createClassGrade,
  updateClassGrade,
  deleteClassGrade,
  getClassGrades,
  getClassGradeById
  } = require("../controllers/classController");

// Get all classes/grades for a school
router.get("/school/:schoolId", getClassGrades);

// Get one class/grade by id
router.get("/:id", getClassGradeById);

// Protected: create/update/delete - only admin/superadmin
router.post("/", auth(["admin", "superadmin"]), createClassGrade);
router.patch("/:id", auth(["admin", "superadmin"]), updateClassGrade);
router.delete("/:id", auth(["admin", "superadmin"]), deleteClassGrade);

module.exports = router;
