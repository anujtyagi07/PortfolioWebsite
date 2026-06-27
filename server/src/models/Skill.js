const mongoose = require('mongoose')

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  iconUrl: String,
  abbr: String,
  accent: String,
  invert: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Skill', skillSchema)
