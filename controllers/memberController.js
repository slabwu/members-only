const db = require('../db/queries')
require('dotenv').config()

exports.getMembership = async (req, res) => {
    res.render('membership', { error: req.flash('error') })
}

exports.postMembership = async (req, res) => {
    switch(req.body.answer) {
        case process.env.MEMBER:
            await db.grantMember(req.user.id)
            return res.redirect('/posts')
        case process.env.ADMIN:
            await db.grantMember(req.user.id)
            await db.grantAdmin(req.user.id)
            return res.redirect('/posts')
        default:
            req.flash('error', 'Incorrect!')
            res.redirect('/membership')
    }
}