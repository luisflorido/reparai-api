
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ServiceSchema extends Schema {
  up() {
    this.create('services', (table) => {
      table.increments();
      table.datetime('closed').nullable();
      table.text('description').notNullable();
      table.integer('user_id').unsigned().references('users.id').index('services_user_id');
      table.integer('device_id').unsigned().references('devices.id').index('services_device_id');
      table.timestamp('deleted_at').nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('services');
  }
}

module.exports = ServiceSchema;
