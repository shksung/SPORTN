
exports.up = function (knex, Promise) {
    return knex.schema.createTableIfNotExists('users', function (table) {
        table.increments('id').primary(); // adds incrementing int for id

        table.string('username') // adds a string column
            .unique() // which has to be unique
            .notNullable() // and is required
        table.string('password')
            .unique()
            .notNullable()
        table.string('name')     
        table.string('bio')
        table.string('picture')
        table.string('interests')
    })
        .createTableIfNotExists('friends', function (table) {
            table.increments('id').primary(); // adds incrementing int for id
            table.integer('friend_id').references('users.id')
            table.integer('user_id').references('users.id')
        })
        .createTableIfNotExists('events', function (table) {
            table.increments('id').primary(); // adds incrementing int for id
            table.string('description')
            table.date('date')
            table.time('time')
            table.string('address')
            table.string('city')
            table.integer('organizer').references('users.id')
            
        })
        .createTableIfNotExists('saved_events', function (table) {
            table.increments('id').primary(); // adds incrementing int for id
            table.string('description')
            table.date('date')
            table.time('time')
            table.string('address')
            table.string('city')
            table.integer('organizer').references('users.id')
            table.integer('user').references('users.id')
        })
};

exports.down = function (knex, Promise) {
    return Promise.all([knex.schema.dropTable('users'),
    knex.schema.dropTable('friends'),
    knex.schema.dropTable('events'),
    knex.schema.dropTable('saved_events')])

    // drop table when reverting
};
