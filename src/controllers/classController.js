const ClassGrade = require("../models/academic/ClassGrade");

// Create a new class/grade
exports.createClassGrade = async (req, res) => {
  try {
    console.log('Received class/grade data:', JSON.stringify(req.body, null, 2));
    
    const classGrade = new ClassGrade(req.body);
    const saved = await classGrade.save();
    res.status(201).json(saved);
  } catch (error) {
    console.log('Error details:', error.message);
    res.status(400).json({ message: error.message });
  }
};


// Update class/grade (PATCH) supports nested fields
exports.updateClassGrade = async (req, res) => {
  try {
    const update = req.body;
    const options = { new: true, runValidators: true };
    const updated = await ClassGrade.findByIdAndUpdate(req.params.id, update, options);
    
    if (!updated) {
      return res.status(404).json({ message: "Class/Grade not found" });
    }
    
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete class/grade
exports.deleteClassGrade = async (req, res) => {
  try {
    const deleted = await ClassGrade.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ message: "Class/Grade not found" });
    }
    
    res.json({ message: "Class/Grade deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Get all classes/grades for a school
exports.getClassGrades = async (req, res) => {
  try {
    const { schoolId } = req.params;
    const { isActive } = req.query;
    
    let query = { school: schoolId };
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }
    
    const classGrades = await ClassGrade.find(query)
      .sort({ order: 1 })
      .populate('school', 'GeneralInfo.name');
    
    res.json(classGrades);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get one class/grade by id
exports.getClassGradeById = async (req, res) => {
  try {
    const classGrade = await ClassGrade.findById(req.params.id)
      .populate('school', 'GeneralInfo.name');
    
    if (!classGrade) {
      return res.status(404).json({ message: "Class/Grade not found" });
    }
    
    res.json(classGrade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

