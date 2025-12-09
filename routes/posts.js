const { Router } = require('express')
const postController = require('../controllers/postController')
const posts = Router()

posts.get('/', postController.getPosts)
posts.get('/new', postController.getNewPost)
posts.post('/new', postController.postNewPost)

module.exports = posts