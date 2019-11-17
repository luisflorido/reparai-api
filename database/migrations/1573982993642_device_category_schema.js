
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DeviceCategorySchema extends Schema {
  up() {
    this.create('device_category', (table) => {
      table.integer('device_id').unsigned().references('devices.id').onDelete('cascade')
        .index('dc_device_id');
      table.string('category_code', 45).unsigned().references('categories.code').onDelete('cascade')
        .index('dc_category_code');
    });
  }

  down() {
    this.drop('device_category');
  }
}

module.exports = DeviceCategorySchema;
