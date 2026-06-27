const router = require('express').Router()
const { getAll } = require('../controllers/contentController')

router.get('/', getAll)

module.exports = router
