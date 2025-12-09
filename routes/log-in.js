const { Router } = require('express')
const authController = require('../controllers/authController')
const logIn = Router()

logIn.get('/', authController.getLogIn)
logIn.post('/', authController.postLogIn)

module.exports = logIn