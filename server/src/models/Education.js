const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  featured: { type: Boolean, default: false },
  title: { type: String, required: true },
  school: { type: String, required: true },
  mode: String,
  period: String,
  location: String,
  grade: String,
  description: String,
  highlights: [String],
  tech: [String],
  accent: String,
  glowColor: String,
  icon: String,
  order: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Education', educationSchema)
