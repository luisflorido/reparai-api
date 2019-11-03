'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('first_name', 80).notNullable()
      table.string('last_name', 80).notNullable()
      table.string('email', 80).notNullable().unique()
      table.string('img', 255).nullable()
      table.string('password', 80).notNullable()
      table.string('password_reset_token', 100).nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
