const db = require('../db/queries')

exports.getPosts = async (req, res) => {
    const posts = (await db.getPosts())
    const mask = (string) => '*'.repeat(string.length)
    
    if (!req.user || !req.member) {
        posts.forEach(post => {
            post.name = 'Anonymous'
            post.username = mask(post.username)
        })
    }

    res.render('posts', { posts: posts })
}

exports.getNewPost = async (req, res) => {
    res.render('new-post')
}

exports.postNewPost = async (req, res) => {
    res.render('new-post')
}