const express = require('express')
const router = express.Router()
const Controller = require('../controllers/events')

router.get('/', (req, res) => {
    Controller.getEvents().then(events => res.json(events))
})

router.post('/', (req, res) => {
    console.log(req.body)
    const { description, date, time, address, city, organizer} = req.body
    Controller
      .addEvents(description, date, time, address, city, organizer )
      .then(event => res.json(event))
  })

  router.delete('/', (req, res) => {
    Controller
      .deleteEvent(req.body.id)
      .then(todo => res.json(todo))
  })


module.exports = router