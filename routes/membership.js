const { Router } = require('express')
const memberController = require('../controllers/memberController')
const authController = require('../controllers/authController')
const isAuth = authController.isAuth
const membership = Router()

membership.get('/', isAuth, memberController.getMembership)
membership.post('/', isAuth, memberController.postMembership)

module.exports = membership