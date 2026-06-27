const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  tagline: String,
  description: String,
  problem: String,
  solution: String,
  result: String,
  techStack: [String],
  images: [String],
  liveUrl: String,
  githubUrl: String,
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  coverGradient: String,
}, { timestamps: true })

module.exports = mongoose.model('Project', projectSchema)
