const Subject = require("../models/academic/Subject");

exports.createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);
    const saved = await subject.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSubject = async (req, res) => {               
    try {
        const update = req.body;
        const options = { new: true, runValidators: true };
        const updated = await Subject.findByIdAndUpdate(req.params.id, update, options);
        if (!updated) return res.status(404).json({ message: "Subject not found" });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSubject = async (req, res) => {               
    try {
        const deleted = await Subject.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Subject not found" });
        res.json({ message: "Subject deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.json(subjects); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getSubjectById = async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.id);
        if (!subject) return res.status(404).json({ message: "Subject not found" });
        res.json(subject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};