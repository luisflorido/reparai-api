
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ServiceSchema extends Schema {
  up() {
    this.create('services', (table) => {
      table.increments();
      table.datetime('created').nullable().defaultTo(this.fn.now());
      table.datetime('closed').nullable();
      table.text('description').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('services');
  }
}

module.exports = ServiceSchema;
