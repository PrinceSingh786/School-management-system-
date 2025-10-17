const mongoose = require("mongoose");

// Define sub-schemas
const GeneralInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  tagline: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    minlength: 6,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  zip: {
    type: String,
    required: true,
    minlength: 6,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  website: {
    type: String,
  },
  prospectus: {
    type: String,
    trim: true,
  },
});

const AcademicInfoSchema = new mongoose.Schema({
  // Affiliation Details
  boardCurriculum: {
    type: String,
    enum: [
      "CBSE (Central Board of Secondary Education)",
      "ICSE (Indian Certificate of Secondary Education)",
      "State Board",
      "IB (International Baccalaureate)",
      "Cambridge (CAIE)",
      "Other",
    ],
    required: true,
  },
  affiliationNumber: {
    type: String,
    required: true,
    trim: true,
  },
  // Academic Year Configuration
  currentAcademicYear: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{4}-\d{4}$/, "Academic year must be in YYYY-YYYY format"],
    default: "2024-2025",
  },
  academicYearStartMonth: {
    type: String,
    enum: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    required: true,
    default: "August",
  },
  academicYearEndMonth: {
    type: String,
    enum: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    required: true,
    default: "June",
  },
  termSystem: {
    type: String,
    enum: ["Semester", "Trimester", "Annual"],
    required: true,
    default: "Semester",
  },
  numberOfTerms: {
    type: Number,
    min: 1,
    max: 6,
    required: true,
    default: 2,
  },
  gradingSystem: {
    type: String,
    enum: ["Percentage", "GPA", "Letter"],
    required: true,
    default: "Percentage",
  },
  // Academic Range/Classes Offered
  fromClass: {
    type: String,
    trim: true,
    required: true,
    default: "Pre-K",
  },
  toClass: {
    type: String,
    trim: true,
    required: true,
    default: "Grade 12",
  },
});

const TimingInfoSchema = new mongoose.Schema({
  // School Timing Configuration
  schoolStartTime: {
    type: String,
    required: true,
    trim: true,
    match: [/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, "Start time must be in HH:MM AM/PM format"],
    default: "08:00 AM",
  },
  schoolEndTime: {
    type: String,
    required: true,
    trim: true,
    match: [/^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/, "End time must be in HH:MM AM/PM format"],
    default: "03:00 PM",
  },
  periodDurationMinutes: {
    type: Number,
    required: true,
    min: 1,
    max: 180,
    default: 45,
  },
  breakDurationMinutes: {
    type: Number,
    required: true,
    min: 0,
    max: 120,
    default: 15,
  },
  lunchDurationMinutes: {
    type: Number,
    required: false,
    min: 0,
    max: 180,
  },
});

const SocialMediaSchema = new mongoose.Schema({
  facebook: {
    type: String,
    trim: true,
    match: [/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-._~:/?#[\]@!$&'()*+,;=%]*)?$/i, "Invalid URL"],
  },
  twitter: {
    type: String,
    trim: true,
    match: [/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-._~:/?#[\]@!$&'()*+,;=%]*)?$/i, "Invalid URL"],
  },
  instagram: {
    type: String,
    trim: true,
    match: [/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-._~:/?#[\]@!$&'()*+,;=%]*)?$/i, "Invalid URL"],
  },
  linkedin: {
    type: String,
    trim: true,
    match: [/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-._~:/?#[\]@!$&'()*+,;=%]*)?$/i, "Invalid URL"],
  },
  youtube: {
    type: String,
    trim: true,
    match: [/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-._~:/?#[\]@!$&'()*+,;=%]*)?$/i, "Invalid URL"],
  },
});

const SchoolSchema = new mongoose.Schema(
  {
    // School General Information
    GeneralInfo: {
      type: GeneralInfoSchema,
      required: false,
    },

    // School Academic Information
    AcademicInfo: {
      type: AcademicInfoSchema,
      required: false,
    },

    // School Timing Information
    TimingInfo: {
      type: TimingInfoSchema,
      required: false,
    },

    // School Social Media Links
    socialMedia: {
      type: SocialMediaSchema,
      default: {},
    },
  },
  { timestamps: true }
);

// Add custom validation to ensure nested objects are provided
SchoolSchema.pre('validate', function(next) {
  if (!this.GeneralInfo || Object.keys(this.GeneralInfo).length === 0) {
    return next(new Error('GeneralInfo is required'));
  }
  if (!this.AcademicInfo || Object.keys(this.AcademicInfo).length === 0) {
    return next(new Error('AcademicInfo is required'));
  }
  if (!this.TimingInfo || Object.keys(this.TimingInfo).length === 0) {
    return next(new Error('TimingInfo is required'));
  }
  next();
});

// Let the sub-schemas handle their own validation

module.exports = mongoose.model("School", SchoolSchema);
