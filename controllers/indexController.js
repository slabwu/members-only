exports.getIndex = async (req, res) => {
    res.render('index', { user: req.user })
}