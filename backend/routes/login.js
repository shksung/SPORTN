const express = require('express')
const router = express.Router()
const passport = require('passport');
let userObject

router.get('/', (req, res) => {
  console.log('trigger')
   res.json(userObject)
   })

router.post('/', (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
      req.login(user, (err) => {
        userObject = req.user
        return res.json({message:"Success"})
      })
    })(req, res, next);
  },)
  
module.exports = router

