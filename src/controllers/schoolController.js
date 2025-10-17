const School = require("../models/School");

// Create a new school
exports.createSchool = async (req, res) => {
  try {
    console.log('Received data:', JSON.stringify(req.body, null, 2));
    console.log('GeneralInfo:', req.body.GeneralInfo);
    console.log('AcademicInfo:', req.body.AcademicInfo);
    console.log('TimingInfo:', req.body.TimingInfo);
    
    const school = new School(req.body);
    const saved = await school.save();
    res.status(201).json(saved);
  } catch (error) {
    console.log('Error details:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Get one school by id
exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.id);
    if (!school) return res.status(404).json({ message: "School not found" });
    res.json(school);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Update school (PATCH) supports nested fields like { "GeneralInfo.name": "..." }
exports.updateSchool = async (req, res) => {
  try {
    const update = req.body;
    const options = { new: true, runValidators: true };
    const updated = await School.findByIdAndUpdate(req.params.id, update, options);
    if (!updated) return res.status(404).json({ message: "School not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete school
exports.deleteSchool = async (req, res) => {
  try {
    const deleted = await School.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "School not found" });
    res.json({ message: "School deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


