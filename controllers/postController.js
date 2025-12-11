const db = require('../db/queries')
const validate = require('../config/validator')
const { validationResult, matchedData } = require("express-validator")

exports.getPosts = async (req, res) => {
    const posts = (await db.getPosts())
    const mask = (string) => '*'.repeat(string.length)
    
    if (!req.user || !req.user.member) {
        posts.forEach(post => {
            post.name = 'Anonymous'
            post.username = mask(post.username)
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
