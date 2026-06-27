const BlogPost = require('../models/BlogPost')

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 })
    res.json(posts)
  } catch {
    res.status(500).json({ message: 'Failed to fetch posts' })
  }
}

exports.getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true })
    if (!post) return res.status(404).json({ message: 'Post not found' })
    res.json(post)
  } catch {
    res.status(500).json({ message: 'Failed to fetch post' })
  }
}

exports.createPost = async (req, res) => {
  try {
    const post = await BlogPost.create(req.body)
    res.status(201).json(post)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!post) return res.status(404).json({ message: 'Post not found' })
    res.json(post)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.deletePost = async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch {
    res.status(500).json({ message: 'Failed to delete post' })
  }
}
