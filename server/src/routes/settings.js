const router = require('express').Router()
const auth = require('../middleware/auth')
const { get, update } = require('../controllers/settingsController')

router.get('/', get)
router.put('/', auth, update)

module.exports = router
