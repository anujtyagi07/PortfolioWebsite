const required = ['MONGODB_URI', 'JWT_SECRET']

required.forEach(key => {
  if (!process.env[key]) {
    console.error(`Missing required env var: ${key}`)
    process.exit(1)
  }
})
