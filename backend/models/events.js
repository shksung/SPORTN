const bookshelf = require('./bookshelf')

const Events = bookshelf.Model.extend({
    tableName: 'events'
  })

  module.exports = Events