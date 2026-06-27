const router = require('express').Router()
const auth = require('../middleware/auth')
const {
  getAllPosts, getPostBySlug,
  createPost, updatePost, deletePost,
} = require('../controllers/blogController')

router.get('/', getAllPosts)
router.get('/:slug', getPostBySlug)
router.post('/', auth, createPost)
router.put('/:id', auth, updatePost)
router.delete('/:id', auth, deletePost)

module.exports = router
