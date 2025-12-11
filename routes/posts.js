const { Router } = require('express')
const postController = require('../controllers/postController')
const authController = require('../controllers/authController')
const isAuth = authController.isAuth
const posts = Router()

posts.get('/', postController.getPosts)
posts.get('/new', isAuth, postController.getNewPost)
posts.post('/new', isAuth, postController.postNewPost)
posts.get('/:postId/edit', isAuth, postController.getEditPost)
posts.post('/:postId/edit', isAuth, postController.postEditPost)
posts.post('/:postId/delete', isAuth, postController.deletePost)

module.exports = posts