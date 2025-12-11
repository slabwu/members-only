const { Router } = require('express')
const memberController = require('../controllers/memberController')
const authController = require('../controllers/authController')
const membership = Router()

membership.get('/', authController.isAuth, memberController.getMembership)
membership.post('/', authController.isAuth, memberController.postMembership)

module.exports = membership