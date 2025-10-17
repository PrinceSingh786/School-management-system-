const mongoose = require("mongoose");

const ClassGradeSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },
    name: {
      type: String, // e.g., "Grade 1", "Pre-K"
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      min: 1,
      index: true,
    },
    code: {
      type: String, // short unique code per school, e.g., G1
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Uniqueness per school
ClassGradeSchema.index({ school: 1, name: 1 }, { unique: true });
ClassGradeSchema.index({ school: 1, order: 1 }, { unique: true });
ClassGradeSchema.index({ school: 1, code: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("ClassGrade", ClassGradeSchema);


