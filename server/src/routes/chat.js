const router = require('express').Router()
const { body } = require('express-validator')
const { chatLimiter } = require('../middleware/rateLimit')
const { handleValidation } = require('../middleware/validate')
const { chat } = require('../controllers/chatController')

router.post(
  '/',
  chatLimiter,
  [body('message').trim().notEmpty().withMessage('Message is required')],
  handleValidation,
  chat
)

module.exports = router
