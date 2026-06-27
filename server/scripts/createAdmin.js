const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const Admin = require('../src/models/Admin')

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI)

  const username = process.argv[2] || 'admin'
  const password = process.argv[3] || 'admin123'

  const existing = await Admin.findOne({ username })
  if (existing) {
    console.log(`Admin "${username}" already exists.`)
    process.exit(0)
  }

  const passwordHash = await bcrypt.hash(password, 12)
  await Admin.create({ username, passwordHash })
  console.log(`✓ Admin created — username: ${username}  password: ${password}`)
  process.exit(0)
}

createAdmin().catch(err => {
  console.error(err.message)
  process.exit(1)
})
