const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    grade:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassGrade",
      index: true,
    },
    code: {
      type: String, // e.g., MATH, ENG
      trim: true,
    },
    type: {
      type: String,
      enum: ["Core", "Elective", "Optional"],
      default: "Core",
      index: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

SubjectSchema.index({ school: 1, name: 1 }, { unique: true });
SubjectSchema.index({ school: 1, code: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("Subject", SubjectSchema);


