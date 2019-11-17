
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class LocationSchema extends Schema {
  up() {
    this.create('locations', (table) => {
      table.string('code', 45).unique().primary();
      table.string('name', 45).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('locations');
  }
}

module.exports = LocationSchema;
