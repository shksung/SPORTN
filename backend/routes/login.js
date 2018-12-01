const express = require('express')
const router = express.Router()
const passport = require('passport');
const Controller = require('../controllers/events')
let userObject



router.get('/', (req, res) => {
  console.log('trigger')
   res.json(userObject)
   })

router.post('/', (req, res, next) => {
    console.log('Inside POST /login callback')
    passport.authenticate('local',
    (err, user, info) => {
      console.log('Inside passport.authenticate() callback');
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      req.login(user, (err) => {
        console.log('Inside req.login() callback')
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
        console.log(`req.user: ${JSON.stringify(req.user)}`)
        userObject = req.user
        return res.json({message:"Success"})
      })
    })(req, res, next);
  },)
  
module.exports = router

