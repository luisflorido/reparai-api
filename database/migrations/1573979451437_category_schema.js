
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CategorySchema extends Schema {
  up() {
    this.create('categories', (table) => {
      table.string('code', 45).unique().primary();
      table.string('name', 45).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('categories');
  }
}

module.exports = CategorySchema;
