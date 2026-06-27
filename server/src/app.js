const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const path = require('path')
require('dotenv').config()

const { connectDB } = require('./config/db')
const projectsRouter = require('./routes/projects')
const blogRouter = require('./routes/blog')
const contactRouter = require('./routes/contact')
const adminRouter = require('./routes/admin')
const chatRouter = require('./routes/chat')
const skillsRouter = require('./routes/skills')
const experienceRouter = require('./routes/experience')
const educationRouter = require('./routes/education')
const settingsRouter = require('./routes/settings')
const resumeRouter = require('./routes/resume')
const contentRouter = require('./routes/content')

connectDB()

const app = express()

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))

const isProduction = process.env.NODE_ENV === 'production'
app.use(cors({
  origin: isProduction ? false : (process.env.CLIENT_URL || 'http://localhost:5173'),
  credentials: true,
}))
app.use(express.json({ limit: '1mb' }))

app.use('/api/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.use('/api/projects', projectsRouter)
app.use('/api/blog', blogRouter)
app.use('/api/contact', contactRouter)
app.use('/api/admin', adminRouter)
app.use('/api/chat', chatRouter)
app.use('/api/skills', skillsRouter)
app.use('/api/experience', experienceRouter)
app.use('/api/education', educationRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/resume', resumeRouter)
app.use('/api/content', contentRouter)

app.get('/api/health', (_, res) => res.json({ status: 'ok', timestamp: new Date() }))

// Serve React build in production
if (isProduction) {
  const clientDist = path.join(__dirname, '..', '..', 'client', 'dist')
  app.use(express.static(clientDist))
  // Catch-all: let React Router handle client-side routes
  app.get('*', (_, res) => res.sendFile(path.join(clientDist, 'index.html')))
}

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: err.message || 'Internal server error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
