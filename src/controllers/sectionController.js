const Section = require("../models/academic/Section");

exports.createSection = async (req, res) => {
  try {
    const section = new Section(req.body);
    const saved = await section.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateSection = async (req, res) => {                       
    try {
        const update = req.body;
        const options = { new: true, runValidators: true };
        const updated = await Section.findByIdAndUpdate(req.params.id, update, options);
        if (!updated) return res.status(404).json({ message: "Section not found" });
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSection = async (req, res) => {       
    try {
        const deleted = await Section.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Section not found" });
        res.json({ message: "Section deleted" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getSections = async (req, res) => {
    try {
        const sections = await Section.find();
        res.json(sections);                 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getSectionById = async (req, res) => {
    try {
        const section = await Section.findById(req.params.id);
        if (!section) return res.status(404).json({ message: "Section not found" });
        res.json(section);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};