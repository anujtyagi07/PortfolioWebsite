const mongoose = require('mongoose')

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️  MONGODB_URI not set — DB-backed routes will fail.')
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
  }
}

module.exports = { connectDB }
