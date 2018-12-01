const express = require('express')
const router = express.Router()
const Controller = require('../controllers/savedEvents')

router.get('/', (req,res) => {
    Controller.getEvents().then(events => res.json(events))
})

router.post('/', (req, res) => {
   const {description,
        date,
        time,
        address,
        city,
        organizer} = req.body
    Controller
    .saveEvents(description, date, time, address, city, organizer )
    .then(event => res.json(event))
})

module.exports = router