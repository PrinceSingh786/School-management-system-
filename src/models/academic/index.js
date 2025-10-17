// Central export for academic setup models
// Usage: const { AcademicSession, ClassGrade, Section, Subject, ClassSubject } = require('../models/academic');

const AcademicSession = require("./AcademicSession");
const ClassGrade = require("./ClassGrade");
const Section = require("./Section");
const Subject = require("./Subject");
const ClassSubject = require("./ClassSubject");

module.exports = {
  AcademicSession,
  ClassGrade,
  Section,
  Subject,
  ClassSubject,
};


