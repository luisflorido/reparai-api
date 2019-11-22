
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Service extends Model {
  static boot() {
    super.boot();

    this.addTrait('@provider:Lucid/SoftDeletes');
  }

  device() {
    return this.belongsTo('App/Models/Device');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  messages() {
    return this.hasMany('App/Models/Message');
  }

  static get hidden() {
    return ['user_id', 'device_id'];
  }

  static get deleteTimestamp() {
    return 'deleted_at';
  }
}

module.exports = Service;
