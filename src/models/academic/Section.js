const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema(
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
    name: {
      type: String, // e.g., "A", "B"
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      min: 1,
    },
    classTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Section name unique per class grade within a school
SectionSchema.index({ school: 1, classGrade: 1, name: 1 }, { unique: true });

module.exports = mongoose.model("Section", SectionSchema);


