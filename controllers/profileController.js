const db = require('../db/queries')

exports.getProfile = async (req, res) => {
    res.render('profile')
}