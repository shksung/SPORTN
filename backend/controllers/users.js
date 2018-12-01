const User = require('../models/users')

module.exports = {
    getUser: () => {
      return new Promise((resolve, reject) => {
       User
          .fetchAll()
          .then(users => {
            resolve(users.models.map(user => user.attributes))
          })
      })
    },
    updateUserBio: (info, id) => {
      return new Promise((resolve, reject) => {
        const attributesToUpdate = {
         bio : info.data
        }
        new User({
            id: id
          })
          .save(attributesToUpdate, {
            patch: true
          })
          .then(user => {
            resolve(user.attributes)
          })
      })
    },
    updateUserInterests: (info, id) => {
      return new Promise((resolve, reject) => {
        const attributesToUpdate = {
         interests : info.data
        }
        new User({
            id: id
          })
          .save(attributesToUpdate, {
            patch: true
          })
          .then(user => {
            resolve(user.attributes)
          })
      })
    }
  
  }