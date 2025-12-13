const db = require('../db/queries')
const validate = require('../config/validator')
const { validationResult, matchedData } = require("express-validator")

exports.getProfile = async (req, res) => {
    res.render('profile')
}

exports.getEditProfile = async (req, res) => {
    res.render('edit-profile', { errors: {} })
}

const editProfile = async (req, res) => {
    const errors = validationResult(req)
    let fields = matchedData(req, { onlyValidData: false })

    if (!errors.isEmpty()) {
        return res.status(400).render('edit-profile', { errors: errors.mapped(), fields: fields })
    }
    
    fields.id = req.user.id
    console.log(fields)
    await db.editUser(fields)
    res.redirect('/profile')
}
exports.postEditProfile = [ validate.editUser, editProfile ]