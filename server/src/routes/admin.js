const router = require('express').Router()
const { body } = require('express-validator')
const { authLimiter } = require('../middleware/rateLimit')
const { handleValidation } = require('../middleware/validate')
const auth = require('../middleware/auth')
const { login, getMessages } = require('../controllers/adminController')

router.post(
  '/login',
  authLimiter,
  [
    body('username').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  handleValidation,
  login
)

router.get('/messages', auth, getMessages)

module.exports = router
