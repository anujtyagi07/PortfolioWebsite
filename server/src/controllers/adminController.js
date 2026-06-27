const jwt = require('jsonwebtoken')
const Message = require('../models/Message')

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'anuj'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '1234@Anuj'

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET || 'dev-secret-change-me',
      { expiresIn: '7d' }
    )
    res.json({ token })
  } catch {
    res.status(500).json({ message: 'Login failed' })
  }
}

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.json(messages)
  } catch {
    res.status(500).json({ message: 'Failed to fetch messages' })
  }
}
