const Message = require('../models/Message')

exports.sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    await Message.create({ name, email, subject, message })
    res.status(201).json({ message: 'Message sent successfully' })
  } catch {
    res.status(500).json({ message: 'Failed to send message' })
  }
}
