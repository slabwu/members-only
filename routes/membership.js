const { Router } = require('express')
const memberController = require('../controllers/memberController')
const membership = Router()

membership.get('/', memberController.getMembership)
membership.post('/', memberController.postMembership)

module.exports = membership