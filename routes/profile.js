const { Router } = require('express')
const profileController = require('../controllers/profileController')
const authController = require('../controllers/authController')
const isAuth = authController.isAuth
const profile = Router()

profile.get('/', isAuth, profileController.getProfile)
profile.get('/edit', isAuth, profileController.getEditProfile)
profile.post('/edit', isAuth, profileController.postEditProfile)

module.exports = profile