require('dotenv').config()
const path = require('node:path')
const express = require('express')
const session = require('express-session')
const passport = require('passport')
const PgSession = require('connect-pg-simple')(session)
const initialisePassport = require('./config/passport')
const flash = require('connect-flash')

const pool = require('./db/pool')
const indexRoute = require('./routes/index')
const signUpRoute = require('./routes/sign-up')
const logInRoute = require('./routes/log-in')
const postsRoute = require('./routes/posts')
const memberRoute = require('./routes/membership')
const profileRoute = require('./routes/profile')


const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

initialisePassport(pool)
app.use(session({ 
    store: new PgSession({ 
        pool: pool,
        createTableIfMissing: true
    }),
    secret: process.env.SECRET, 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

app.use('/', indexRoute)
app.use('/sign-up', signUpRoute)
app.use('/log-in', logInRoute)
app.use('/posts', postsRoute)
app.use('/membership', memberRoute)
app.use('/profile', profileRoute)

app.listen(8080, (error) => {
    if (error) {
        throw error
    }
    console.log('app listening on port 8080')
})