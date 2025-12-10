const db = require('../db/queries')

exports.getPosts = async (req, res) => {
    const posts = await db.getPosts()
    res.render('posts', { posts: posts })
}

exports.getNewPost = async (req, res) => {
    res.render('new-post')
}

exports.postNewPost = async (req, res) => {
    res.render('new-post')
}