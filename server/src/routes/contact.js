const router = require('express').Router()
const { body } = require('express-validator')
const { contactLimiter } = require('../middleware/rateLimit')
const { handleValidation } = require('../middleware/validate')
const { sendMessage } = require('../controllers/contactController')

router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('message').trim().isLength({ min: 10 }).withMessage('Message must be at least 10 characters'),
  ],
  handleValidation,
  sendMessage
)

module.exports = router
