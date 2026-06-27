const Experience = require('../models/Experience')

exports.getAll = async (req, res) => {
  try {
    const items = await Experience.find().sort({ order: 1, createdAt: -1 })
    res.json(items)
  } catch {
    res.status(500).json({ message: 'Failed to fetch experience' })
  }
}

exports.create = async (req, res) => {
  try {
    const item = await Experience.create(req.body)
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.update = async (req, res) => {
  try {
    const item = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!item) return res.status(404).json({ message: 'Experience not found' })
    res.json(item)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.remove = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch {
    res.status(500).json({ message: 'Failed to delete experience' })
  }
}
