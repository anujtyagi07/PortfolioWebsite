const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
  key: { type: String, default: 'site', unique: true },

  name: { type: String, default: 'Anuj Tyagi' },
  role: { type: String, default: 'MERN Stack Developer' },
  tagline: { type: String, default: 'Building fast, scalable web apps that drive real results.' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  location: { type: String, default: 'India' },
  available: { type: Boolean, default: true },

  github: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' },
  instagram: { type: String, default: '' },

  resumeUrl: { type: String, default: '' },
}, { timestamps: true })

module.exports = mongoose.model('Settings', settingsSchema)
