const mongoose = require('mongoose')

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  type: String,
  period: String,
  location: String,
  description: String,
  highlights: [String],
  tech: [String],
  accent: String,
  order: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Experience', experienceSchema)
