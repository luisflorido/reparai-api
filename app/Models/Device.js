
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Device extends Model {
  categories() {
    return this.belongsToMany('App/Models/Category').pivotTable('device_categories');
  }

  locations() {
    return this.belongsToMany('App/Models/Location').pivotTable('device_locations');
  }

  services() {
    return this.hasMany('App/Models/Service');
  }
}

module.exports = Device;
