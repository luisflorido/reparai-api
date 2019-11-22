
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Message extends Model {
  static boot() {
    super.boot();

    this.addTrait('@provider:Lucid/SoftDeletes');
  }

  service() {
    return this.hasOne('App/Models/Service');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  static get hidden() {
    return ['service_id', 'user_id'];
  }

  static get deleteTimestamp() {
    return 'deleted_at';
  }
}

module.exports = Message;
