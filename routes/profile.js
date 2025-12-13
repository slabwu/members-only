const { Router } = require('express')
const profileController = require('../controllers/profileController')
const authController = require('../controllers/authController')
const isAuth = authController.isAuth
const profile = Router()

profile.get('/', isAuth, profileController.getProfile)
profile.post('/', isAuth, profileController.getProfile)

module.exports = profile