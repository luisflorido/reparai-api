
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DeviceSchema extends Schema {
  up() {
    this.create('devices', (table) => {
      table.increments();
      table.string('mac', 64).nullable();
      table.string('name', 45).notNullable();
      table.boolean('active').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('devices');
  }
}

module.exports = DeviceSchema;
