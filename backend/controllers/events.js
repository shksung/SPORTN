const Events = require('../models/events')

module.exports = {
    getEvents: () => {
      return new Promise((resolve, reject) => {
       Events
          .fetchAll()
          .then(events => {
            resolve(events.models.map(event => event.attributes))
          })
      })
    },
    addEvents: (description, date, time, address, city, organizer) => {
      
      return new Promise((resolve, reject) => {
        new Events({
            description,
            date,
            time, 
            address, 
            city, 
            organizer
          }).save()
          .then(event => {
            resolve(event.attributes)
          })
      })
    },
    deleteEvent: (id) => {
      return new Promise((resolve, reject) => {
        new Events({
            id
          })
          .destroy()
          .then(event => resolve(event))
      })
    }
  }