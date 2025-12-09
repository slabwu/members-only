const passport = require('passport')
const bcrypt = require('bcryptjs')
const pool = require('../db/pool')

exports.getLogIn = async (req, res) => {
    res.render('log-in')
}

exports.postLogIn = async (req, res) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    })(req, res)
}

exports.getSignUp = async (req, res) => {
    res.render('sign-up')
}

exports.postSignUp = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [req.body.username, hashedPassword])
        res.redirect('/')
    } catch (error) {
        console.error(error)
        next(error)
    }
}

exports.logOut = async (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err)
        res.redirect('/')
    })
}