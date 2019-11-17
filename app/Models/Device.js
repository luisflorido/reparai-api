
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Device extends Model {
  categories() {
    return this.belongsToMany('App/Models/Category');
  }

  locations() {
    return this.belongsToMany('App/Models/Location');
  }

  services() {
    return this.belongsToMany('App/Models/Service');
  }
}

module.exports = Device;
