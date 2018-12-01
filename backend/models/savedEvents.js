const bookshelf = require('./bookshelf')

const savedEvents = bookshelf.Model.extend({
    tableName: 'saved_events'
  })

  module.exports = savedEvents