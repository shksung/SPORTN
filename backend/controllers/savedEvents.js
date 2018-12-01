const savedEvents = require('../models/savedEvents')

module.exports = {
  getEvents: () => {
    return new Promise((resolve, reject) => {
     savedEvents
        .fetchAll()
        .then(events => {
          resolve(events.models.map(event => event.attributes))
        })
    })
  },
    saveEvents: (description, date, time, address, city, organizer) => {
      
        return new Promise((resolve, reject) => {
          new savedEvents({
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
      }


}