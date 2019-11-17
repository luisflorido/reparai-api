
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DeviceLocationSchema extends Schema {
  up() {
    this.create('device_location', (table) => {
      table.integer('device_id').unsigned().references('devices.id').onDelete('cascade')
        .index('dl_device_id');
      table.string('location_code', 45).unsigned().references('locations.code').onDelete('cascade')
        .index('dl_location_code');
    });
  }

  down() {
    this.drop('device_location');
  }
}

module.exports = DeviceLocationSchema;
