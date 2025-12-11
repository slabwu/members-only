const db = require('../db/queries')
const validate = require('../config/validator')
const { validationResult, matchedData } = require("express-validator")
const { hash, getColor } = require('../config/helper')

exports.getPosts = async (req, res) => {
    const posts = await db.getPosts()
    
    if (!req.user || !req.user.member) {
        posts.forEach(post => {
            post.color = getColor(post.username)
            if (req.user && req.user.id === post.author_id) return
            post.name = 'Anonymous'
            post.username = 'User-' + hash(post.username)
        })
    }

    res.render('posts', { posts: posts })
}

exports.getNewPost = async (req, res) => {
    res.render('new-post', { errors: {}, fields: {} })
}

const newPost = async (req, res) => {
    const errors = validationResult(req)
    let fields = matchedData(req, { onlyValidData: false })

    if (!errors.isEmpty()) {
        return res.status(400).render('new-post', { errors: errors.mapped(), fields: fields })
    }
    
    fields.author_id = req.user.id
    await db.addPost(fields)
    res.redirect('/posts')
}
exports.postNewPost = [ validate.post, newPost ]

exports.getEditPost = async (req, res) => {
    let fields = await db.getPost(req.params.postId)
    res.render('edit-post', { errors: {}, fields: fields, postId: req.params.postId }) 
}

const editPost = async (req, res) => {
    const errors = validationResult(req)
    let fields = matchedData(req, { onlyValidData: false })

    if (!errors.isEmpty()) {
        return res.status(400).render('edit-post', { errors: errors.mapped(), fields: fields, postId: req.params.postId })
    }
    
    fields.id = req.params.postId
    await db.editPost(fields)
    res.redirect('/posts')
}
exports.postEditPost = [ validate.post, editPost ]

exports.deletePost = async (req, res) => {
    await db.deletePost(req.params.postId)
    res.redirect('/posts')
}