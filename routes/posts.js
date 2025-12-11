const { Router } = require('express')
const postController = require('../controllers/postController')
const authController = require('../controllers/authController')
const posts = Router()

posts.get('/', postController.getPosts)
posts.get('/new', authController.isAuth, postController.getNewPost)
posts.post('/new', authController.isAuth, postController.postNewPost)

module.exports = posts