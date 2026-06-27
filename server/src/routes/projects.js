const router = require('express').Router()
const auth = require('../middleware/auth')
const {
  getAllProjects, getProjectBySlug,
  createProject, updateProject, deleteProject,
} = require('../controllers/projectsController')

router.get('/', getAllProjects)
router.get('/:slug', getProjectBySlug)
router.post('/', auth, createProject)
router.put('/:id', auth, updateProject)
router.delete('/:id', auth, deleteProject)

module.exports = router
