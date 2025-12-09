require('dotenv').config()
const path = require('node:path')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const initialisePassport = require('./config/passport')
const pool = require('./db/pool')
const indexRoute = require('./routes/index')
const signUpRoute = require('./routes/sign-up')
const logInRoute = require('./routes/log-in')

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

initialisePassport(pool)
app.use(session({ secret: process.env.SECRET, resave: false, saveUninitialized: false }))
app.use(passport.session())

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

app.use('/', indexRoute)
app.use('/sign-up', signUpRoute)
app.use('/log-in', logInRoute)

app.listen(8080, (error) => {
    if (error) {
        throw error
    }
    console.log('app listening on port 8080')
})