
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Service extends Model {
  device() {
    return this.hasOne('App/Models/Device');
  }

  histories() {
    return this.belongsToMany('App/Models/Message');
  }
}

module.exports = Service;
