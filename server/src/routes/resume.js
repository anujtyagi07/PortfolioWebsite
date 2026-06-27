const router = require('express').Router()
const auth = require('../middleware/auth')
const { upload, handleUpload, remove } = require('../controllers/resumeController')

router.post('/', auth, upload, handleUpload)
router.delete('/', auth, remove)

module.exports = router
