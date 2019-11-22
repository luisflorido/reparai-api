
/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class MessagesSchema extends Schema {
  up() {
    this.create('messages', (table) => {
      table.increments();
      table.integer('service_id').unsigned().references('services.id').onDelete('cascade')
        .index('m_service_id');
      table.integer('user_id').unsigned().references('users.id').onDelete('cascade')
        .index('m_user_id');
      table.text('text').notNullable();
      table.timestamp('deleted_at').nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('messages');
  }
}

module.exports = MessagesSchema;
