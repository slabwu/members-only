const { Router } = require('express')
const indexController = require('../controllers/indexController')
const authController = require('../controllers/authController')
const index = Router()

index.get('/', indexController.getIndex)
index.get('/log-out', authController.logOut)

module.exports = index