const Skill = require('../models/Skill')

exports.getAll = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 })
    res.json(skills)
  } catch {
    res.status(500).json({ message: 'Failed to fetch skills' })
  }
}

exports.create = async (req, res) => {
  try {
    const skill = await Skill.create(req.body)
    res.status(201).json(skill)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.update = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!skill) return res.status(404).json({ message: 'Skill not found' })
    res.json(skill)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.remove = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch {
    res.status(500).json({ message: 'Failed to delete skill' })
  }
}
