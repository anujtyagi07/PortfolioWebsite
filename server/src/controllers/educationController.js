const Education = require('../models/Education')

exports.getAll = async (req, res) => {
  try {
    const items = await Education.find().sort({ order: 1, createdAt: 1 })
    res.json(items)
  } catch {
    res.status(500).json({ message: 'Failed to fetch education' })
  }
}

exports.create = async (req, res) => {
  try {
    const item = await Education.create(req.body)
    res.status(201).json(item)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.update = async (req, res) => {
  try {
    const item = await Education.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!item) return res.status(404).json({ message: 'Education not found' })
    res.json(item)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.remove = async (req, res) => {
  try {
    await Education.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch {
    res.status(500).json({ message: 'Failed to delete education' })
  }
}
