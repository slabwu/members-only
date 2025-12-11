const { Router } = require('express')
const postController = require('../controllers/postController')
const authController = require('../controllers/authController')
const posts = Router()

posts.get('/', postController.getPosts)
posts.get('/new', authController.isAuth, postController.getNewPost)
posts.post('/new', authController.isAuth, postController.postNewPost)
posts.get('/:postId/edit', authController.isAuth, postController.getEditPost)
posts.post('/:postId/edit', authController.isAuth, postController.postEditPost)
posts.post('/:postId/delete', authController.isAuth, postController.deletePost)

module.exports = posts