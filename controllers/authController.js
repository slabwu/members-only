const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../db/queries')
const validate = require('../config/validator')
const { validationResult, matchedData } = require("express-validator")

exports.getLogIn = async (req, res) => {
    res.render('log-in', { error: req.flash('error') })
}

exports.postLogIn = async (req, res) => {
    passport.authenticate('local', {
        successRedirect: '/posts',
        failureRedirect: '/log-in',
        failureFlash: true
    })(req, res)
}

exports.getSignUp = async (req, res) => {
    res.render('sign-up', { errors: {}, fields: {} })
}

const signUp = async (req, res) => {
    const errors = validationResult(req)
    let fields = matchedData(req, { onlyValidData: false })

    if (!errors.isEmpty()) {
        return res.status(400).render('sign-up', { errors: errors.mapped(), fields: fields })
    }
    
    fields.password = await bcrypt.hash(fields.password, 10)
    await db.addUser(fields)
    this.postLogIn(req, res)
}
exports.postSignUp = [ validate.user, signUp ]

exports.logOut = async (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err)
        res.redirect('/')
    })
}

exports.isAuth = async (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/log-in')
    }
}