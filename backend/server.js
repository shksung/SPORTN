const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || process.argv[2] || 8080
const cors = require('cors')
var session = require('express-session');
var flash = require('express-flash')
const UserRouter = require('./routes/login')
const HomeRouter= require('./routes/home')
const getUsersRouter= require('./routes/getUsers')
const markerRouter= require('./routes/markers')
const savedEventsRouter =  require('./routes/saveEvents')
const LocalStrategy = require('passport-local').Strategy;
const Controller = require('./controllers/users')
var users

const passport = require('passport')

app.use(flash())
app.use(bodyParser.json());
app.use(cors())
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'woot',
  resave: false,
  saveUninitialized: false
}));

app.listen(port, () => {
  console.log(`Listening on ${port}...`)
})

Controller.getUser().then(user =>
  { users=user}
   )

passport.use(new LocalStrategy(
  (email, password, done) => {
    for (let i =0; i <users.length; i++) {
      if(email === users[i].username && password === users[i].password) {
        return done(null, users[i])
      }
    }
    
  }
))
passport.serializeUser((user, done) => {
  done(null, user.id);
});

app.use(passport.initialize());
app.use(passport.session());
app.use('/login', UserRouter)
app.use('/home', HomeRouter)
app.use('/users', getUsersRouter)
app.use('/markers', markerRouter)
app.use('/save', savedEventsRouter)


