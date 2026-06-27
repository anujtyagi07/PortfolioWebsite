const Settings = require('../models/Settings')

async function getOrCreate() {
  let s = await Settings.findOne({ key: 'site' })
  if (!s) s = await Settings.create({ key: 'site' })
  return s
}

exports.get = async (req, res) => {
  try {
    const settings = await getOrCreate()
    res.json(settings)
  } catch {
    res.status(500).json({ message: 'Failed to fetch settings' })
  }
}

exports.update = async (req, res) => {
  try {
    const settings = await getOrCreate()
    Object.assign(settings, req.body)
    settings.key = 'site'
    await settings.save()
    res.json(settings)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
