const mongoose = require("mongoose");

const AcademicSessionSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
      index: true,
    },
    name: {
      type: String, // e.g., "2024-2025"
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Completed", "Active", "Upcoming"],
      required: true,
      default: "Upcoming",
      index: true,
    },
    isCurrent: {
      type: Boolean,
      default: false,
      index: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// A school cannot have two sessions with the same name
AcademicSessionSchema.index({ school: 1, name: 1 }, { unique: true });

// Ensure date integrity
AcademicSessionSchema.pre("validate", function (next) {
  if (this.startDate && this.endDate && this.startDate >= this.endDate) {
    return next(new Error("startDate must be earlier than endDate"));
  }
  next();
});

module.exports = mongoose.model("AcademicSession", AcademicSessionSchema);


