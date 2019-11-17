
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Message extends Model {
  service() {
    return this.hasOne('App/Models/Service');
  }

  user() {
    return this.hasOne('App/Models/User');
  }
}

module.exports = Message;
