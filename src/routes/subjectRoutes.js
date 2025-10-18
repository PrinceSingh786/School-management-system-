const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");

const {
    createSubject,
    updateSubject,
    deleteSubject,
    getSubjects,
    getSubjectById
} = require("../controllers/subjectController");

router.get("/school/:schoolId", getSubjects);

router.get("/:id", getSubjectById);

router.post("/", auth(["admin", "superadmin"]), createSubject);
router.patch("/:id", auth(["admin", "superadmin"]), updateSubject);
router.delete("/:id", auth(["admin", "superadmin"]), deleteSubject);

module.exports = router;