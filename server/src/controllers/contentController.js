const Project = require('../models/Project')
const Skill = require('../models/Skill')
const Experience = require('../models/Experience')
const Education = require('../models/Education')
const Settings = require('../models/Settings')

exports.getAll = async (req, res) => {
  try {
    const [projects, skills, experience, education, settings] = await Promise.all([
      Project.find().sort({ order: 1, createdAt: -1 }),
      Skill.find().sort({ order: 1, createdAt: 1 }),
      Experience.find().sort({ order: 1, createdAt: -1 }),
      Education.find().sort({ order: 1, createdAt: 1 }),
      Settings.findOne({ key: 'site' }),
    ])
    res.json({
      projects,
      skills,
      experience,
      education,
      settings: settings || {},
    })
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch content', error: err.message })
  }
}
