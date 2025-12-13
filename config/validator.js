const { body } = require("express-validator")
const db = require('../db/queries')

const user = [
    body('first').trim()
        .notEmpty().withMessage('Required.')
        .isAlpha().withMessage('Letters only.')
        .isLength({ max: 30 }).withMessage('Must be under 30 characters.'),
    body('last').trim()
        .notEmpty().withMessage('Required.')
        .isAlpha().withMessage('Letters only.')
        .isLength({ max: 30 }).withMessage('Must be under 30 characters.'),
    body('username').trim()
        .notEmpty().withMessage('Username is required.')
        .isLength({ max: 30 }).withMessage('Username must be under 30 characters.')
        .custom( async (value, { req }) => {
            if (req.user && value === req.user.username) return true
            if (await db.usernameTaken(value)) throw new Error()
            return true
        }).withMessage('Username is already taken.'),
    body('password').trim()
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
    body('confirm').trim()
        .notEmpty().withMessage('This field is required.')
        .custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match.')
]

const editUser = [
    body('first').trim()
        .notEmpty().withMessage('Required.')
        .isAlpha().withMessage('Letters only.')
        .isLength({ max: 30 }).withMessage('Must be under 30 characters.'),
    body('last').trim()
        .notEmpty().withMessage('Required.')
        .isAlpha().withMessage('Letters only.')
        .isLength({ max: 30 }).withMessage('Must be under 30 characters.'),
    body('username').trim()
        .notEmpty().withMessage('Username is required.')
        .isLength({ max: 30 }).withMessage('Username must be under 30 characters.')
        .custom( async (value, { req }) => {
            if (req.user && value === req.user.username) return true
            if (await db.usernameTaken(value)) throw new Error()
            return true
        }).withMessage('Username is already taken.')
]

const post = [
    body('title').trim()
        .notEmpty().withMessage('Title is required.'),
    body('text').trim()
        .notEmpty().withMessage('Text is required.')
]

module.exports = {
    user,
    editUser,
    post
}