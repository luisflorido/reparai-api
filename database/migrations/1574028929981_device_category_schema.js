
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DeviceCategorySchema extends Schema {
  up() {
    this.create('device_categories', (table) => {
      table.integer('device_id').unsigned().references('devices.id').onDelete('cascade')
        .index('dc_device_id');
      table.string('category_id', 45).unsigned().references('categories.code').onDelete('cascade')
        .index('dc_category_code');
      table.unique(['device_id', 'category_id']);
    });
  }

  down() {
    this.drop('device_categories');
  }
}

module.exports = DeviceCategorySchema;
