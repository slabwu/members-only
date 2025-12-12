const { body } = require("express-validator")

const user = [
    body('first').trim()
        .notEmpty().withMessage('Required.')
        .isAlpha().withMessage('Must only contain letters.')
        .isLength({ max: 30 }).withMessage('Must be under 30 characters.'),
    body('last').trim()
        .notEmpty().withMessage('Required.')
        .isAlpha().withMessage('Must only contain letters.')
        .isLength({ max: 30 }).withMessage('Must be under 30 characters.'),
    body('username').trim()
        .notEmpty().withMessage('Username is required.')
        .isLength({ max: 30 }).withMessage('Username must be under 30 characters.'),
    body('password').trim()
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters.'),
    body('confirm').trim()
        .notEmpty().withMessage('This field is required.')
        .custom((value, { req }) => value === req.body.password).withMessage('Passwords do not match.')
]

const post = [
    body('title').trim()
        .notEmpty().withMessage('Title is required.'),
    body('text').trim()
        .notEmpty().withMessage('Text is required.')
]

module.exports = {
    user,
    post
}