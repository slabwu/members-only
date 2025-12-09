const { Router } = require('express')
const authController = require('../controllers/authController')
const signUp = Router()

signUp.get('/', authController.getSignUp)
signUp.post('/', authController.postSignUp)

module.exports = signUp