const mongoose = require("mongoose");

const ClassSubjectSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },
    classGrade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassGrade",
      required: true,
      index: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
      index: true,
    },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicSession",
      required: true,
      index: true,
    },
    isMandatory: {
      type: Boolean,
      default: true,
    },
    weeklyPeriods: {
      type: Number,
      min: 0,
      default: 0,
    },
  },
  { timestamps: true }
);

// A subject can appear only once per class per session per school
ClassSubjectSchema.index(
  { school: 1, session: 1, classGrade: 1, subject: 1 },
  { unique: true }
);

module.exports = mongoose.model("ClassSubject", ClassSubjectSchema);


