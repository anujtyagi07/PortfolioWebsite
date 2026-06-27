const path = require('path')
const fs = require('fs')
const multer = require('multer')
const Settings = require('../models/Settings')

const UPLOAD_DIR = path.join(__dirname, '..', '..', 'uploads')
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, 'resume.pdf'),
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') cb(null, true)
  else cb(new Error('Only PDF files are allowed'))
}

exports.upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
}).single('resume')

exports.handleUpload = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })

    const resumeUrl = '/api/uploads/resume.pdf'
    let s = await Settings.findOne({ key: 'site' })
    if (!s) s = await Settings.create({ key: 'site' })
    s.resumeUrl = resumeUrl
    await s.save()

    res.json({ message: 'Resume uploaded', resumeUrl })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.remove = async (req, res) => {
  try {
    const filePath = path.join(UPLOAD_DIR, 'resume.pdf')
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)

    const s = await Settings.findOne({ key: 'site' })
    if (s) {
      s.resumeUrl = ''
      await s.save()
    }
    res.json({ message: 'Resume removed' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
