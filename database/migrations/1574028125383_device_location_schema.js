
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DeviceLocationSchema extends Schema {
  up() {
    this.create('device_locations', (table) => {
      table.integer('device_id').unsigned().references('devices.id').onDelete('cascade')
        .index('dl_device_id');
      table.string('location_id', 45).unsigned().references('locations.code').onDelete('cascade')
        .index('dl_location_code');
      table.unique(['device_id', 'location_id']);
    });
  }

  down() {
    this.drop('device_locations');
  }
}

module.exports = DeviceLocationSchema;
